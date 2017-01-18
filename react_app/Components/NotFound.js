import React, { Component } from 'react'
import { Link } from 'react-router'

export default React.createClass({

    displayName: 'NotFound',

    render: function () {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                    Страница не найдена. Вернуться на <Link to='/'>главную</Link>?
                    </div>
                </div>
            </div>
        );
    }
});
