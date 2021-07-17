import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

class Header extends Component {

    render() { 
        return (
            <nav className='blue-grey' style={{ height: '51px', lineHeight: '51px'}}>
                <div className='nav-wrapper container'>
                    <Link
                            to='/'
                            className='left'
                        >
                            <div className='white-text' style={{lineHeight: '16px', paddingBottom: '4px'}}>
                                <span style={{fontSize: '26px', lineHeight: '30px', letterSpacing: '10px'}}>DS2G</span><br />
                                Data Generator
                            </div>
                        </Link>
                    <ul className='right'>
                        <li><Link to='/help'><i className="material-icons" style={{height: '51px', lineHeight: '51px'}}>help</i></Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;