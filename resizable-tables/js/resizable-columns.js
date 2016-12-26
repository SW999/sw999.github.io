function getWidth(x) {
    return document.defaultView.getComputedStyle(x, null).getPropertyValue("width") || 0;
}

// main class prototype
function ColumnResize(table) {
    if (table.tagName != 'TABLE') return;

    this.id = table.id;

    // ============================================================
    // private data
    var self = this,
        dragColumns = table.rows[0].cells, // first row columns, used for changing of width
        dragColumnsLength = dragColumns.length;

    if (!dragColumns) return; // return if no table exists or no one row exists

    var dragColumnNo, // current dragging column
        dragX,        // last event X mouse coordinate
        saveOnmouseup,   // save document onmouseup event handler
        saveOnmousemove, // save document onmousemove event handler
        saveBodyCursor;  // save body cursor property

    // ============================================================
    // methods

    // ============================================================
    // do changes columns widths
    // returns true if success and false otherwise
    this.changeColumnWidth = function (no, w) {
        if (!dragColumns) return false;

        if (no < 0) return false;
        if (dragColumns.length < no) return false;

        if (parseInt(dragColumns[no].style.width) <= -w) return false;
        if (dragColumns[no + 1] && parseInt(dragColumns[no + 1].style.width) <= w) return false;

        dragColumns[no].style.width = parseInt(dragColumns[no].style.width) + w + 'px';
        if (dragColumns[no + 1]) {
            dragColumns[no + 1].style.width = parseInt(dragColumns[no + 1].style.width) - w + 'px';
        }

        return true;
    };

    // ============================================================
    // do drag column width
    this.columnDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();

        var X = e.pageX;
        if (!self.changeColumnWidth(dragColumnNo, X - dragX)) {
            // stop drag!
            self.stopColumnDrag(e);
        }

        dragX = X;
    };

    // ============================================================
    // stops column dragging
    this.stopColumnDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (!dragColumns) return;

        // restore handlers & cursor
        document.onmouseup = saveOnmouseup;
        document.onmousemove = saveOnmousemove;
        document.body.style.cursor = saveBodyCursor;

        // remember columns widths in cookies for server side
        var colWidth = '',
            separator = '';

        for (var i = 0; i < dragColumnsLength; i++) {
            colWidth += separator + parseInt(getWidth(dragColumns[i]));
            separator = '+';
        }
        var expire = new Date();
        expire.setDate(expire.getDate() + 365); // year
        document.cookie = self.id + '-width=' + colWidth +
        '; expires=' + expire.toGMTString();
    };

    // ============================================================
    // init data and start dragging
    this.startColumnDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();

        // remember dragging object
        dragColumnNo = (e.target).parentNode.parentNode.cellIndex;
        dragX = e.pageX;

        // set up current columns widths in their particular attributes
        for (var y = 0; y < dragColumnsLength; y++) {
            dragColumns[y].width = ""; // for sure
            dragColumns[y].style.width = parseInt(getWidth(dragColumns[y])) + "px";
        }

        saveOnmouseup = document.onmouseup;
        document.onmouseup = self.stopColumnDrag;

        saveBodyCursor = document.body.style.cursor;
        document.body.style.cursor = 'w-resize';

        // fire!
        saveOnmousemove = document.onmousemove;
        document.onmousemove = self.columnDrag;
    };

    // prepare table header to be draggable
    // it runs during class creation
    for (var i = 0; i < dragColumnsLength; i++) {
        dragColumns[i].innerHTML = "<div class='drag-wrapper'><div class='drag-marker'></div><div class='drag-th-content'>" +
        dragColumns[i].innerHTML + "</div></div>";
        dragColumns[i].firstChild.firstChild.onmousedown = this.startColumnDrag;
    }
}

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
