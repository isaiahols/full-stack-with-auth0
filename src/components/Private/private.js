import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";

import { updateUser } from "../../ducks/users";


class Private extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let userData = await axios.get('/api/user-data')

        this.props.updateUser(userData.data)

    }


    render() {
        let { user } = this.props
        console.log(this.props);
        console.log(user);

        return (
            <div>
                <h1>Account Details</h1>
                <hr /><hr /><hr />
                {
                    user.user_name ? (
                        <div>
                            <p>Account Holder: {user.user_name}</p>
                            <p>My Photo: <img src={user.picture} alt="" /></p>
                            <p></p>
                            <p></p>
                        </div>
                    ) : (<p>Please log in</p>)
                }
                <a href='http://localhost:3030/auth/logout'>
                    <button>Logout?</button>
                </a>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state

    return {
        user

    };
}

export default connect(mapStateToProps, { updateUser })(Private)