function getWidth(x) {
  return document.defaultView.getComputedStyle(x, null).getPropertyValue("width") || 0;
}

// main class prototype
function ColumnResize(table) {
  if (table.tagName !== 'TABLE') return;

  this.id = table.id;
  this.dragColumns = table.rows[0].cells; // first row columns, used for changing of width
  this.dragColumnsLength = this.dragColumns.length;
  this.dragColumnNo = null; // current dragging column
  this.dragX = null; // last event X mouse coordinate
  this.saveOnmouseup = null;   // save document onmouseup event handler
  this.saveOnmousemove = null; // save document onmousemove event handler
  this.saveBodyCursor = null;  // save body cursor property

  this.init();
}

ColumnResize.prototype.init = function () {
  var sizesArr = this.getSizesFromStorage();
  // prepare table header to be draggable
  // it runs during class creation
  for (var i = 0; i < this.dragColumnsLength; i++) {
    var inner = this.dragColumns[i].innerHTML;
    if (sizesArr.length > 0) {
      this.dragColumns[i].style.width = sizesArr[i] + "px";
    }

    this.dragColumns[i].innerHTML = "<div class='drag-wrapper'><div class='drag-marker'></div><div class='drag-th-content'>" + inner + "</div></div>";
    this.dragColumns[i].firstChild.firstChild.onmousedown = this.startColumnDrag.bind(this);
  }
};

ColumnResize.prototype.startColumnDrag = function (e) {
  e.preventDefault();
  e.stopPropagation();

  // remember dragging object
  this.dragColumnNo = (e.target).parentNode.parentNode.cellIndex;
  this.dragX = e.pageX;

  // set up current columns widths in their particular attributes
  for (var y = 0; y < this.dragColumnsLength; y++) {
    this.dragColumns[y].width = ""; // for sure
    this.dragColumns[y].style.width = parseInt(getWidth(this.dragColumns[y])) + "px";
  }

  this.saveOnmouseup = document.onmouseup;
  document.onmouseup = this.stopColumnDrag.bind(this);

  this.saveBodyCursor = document.body.style.cursor;
  document.body.style.cursor = 'w-resize';

  // fire!
  this.saveOnmousemove = document.onmousemove;
  document.onmousemove = this.columnDrag.bind(this);
};

ColumnResize.prototype.stopColumnDrag = function (e) {
  e.preventDefault();
  e.stopPropagation();

  // restore handlers & cursor
  document.onmouseup = this.saveOnmouseup;
  document.onmousemove = this.saveOnmousemove;
  document.body.style.cursor = this.saveBodyCursor;

  // remember columns widths in localStorage
  var colWidth = '',
    separator = '';

  for (var i = 0; i < this.dragColumnsLength; i++) {
    colWidth += separator + parseInt(getWidth(this.dragColumns[i]));
    separator = '+';
  }

  localStorage.setItem(this.id + '-width', colWidth);
};

ColumnResize.prototype.columnDrag = function (e) {
  e.preventDefault();
  e.stopPropagation();

  var X = e.pageX;

  if (!this.changeColumnWidth(this.dragColumnNo, X - this.dragX)) {
    // stop drag!
    this.stopColumnDrag(e);
  }

  this.dragX = X;
};

ColumnResize.prototype.changeColumnWidth = function (columnIndex, deltaX) {
  if (columnIndex < 0 || this.dragColumnsLength < columnIndex) return false;

  if (parseInt(this.dragColumns[columnIndex].style.width) <= -deltaX) return false;
  if (this.dragColumns[columnIndex + 1] && parseInt(this.dragColumns[columnIndex + 1].style.width) <= deltaX) return false;

  this.dragColumns[columnIndex].style.width = parseInt(this.dragColumns[columnIndex].style.width) + deltaX + 'px';
  if (this.dragColumns[columnIndex + 1]) {
    this.dragColumns[columnIndex + 1].style.width = parseInt(this.dragColumns[columnIndex + 1].style.width) - deltaX + 'px';
  }

  return true;
};

ColumnResize.prototype.getSizesFromStorage = function () {
  var sizes = localStorage.getItem(this.id + '-width');

  if (!sizes) return [];
  return sizes.split('+');
};

// select all tables and make resizable those that have 'resizable' class
function ResizableColumns() {
  var tables = document.querySelectorAll('table');

  for (var i = 0; tables.item(i); i++) {
    if (tables[i].classList.contains('resizable')) {
      // generate id
      if (!tables[i].id) tables[i].id = 'table' + (i + 1);
      // make table resizable
      new ColumnResize(tables[i]);
    }
  }
}

window.addEventListener('load', ResizableColumns, false);
