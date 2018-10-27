import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProfile } from "../../actions/getProfile";
import { getFriends } from "../../actions/getFriends";
import { transferFund } from "../../actions/transferFunds";
import { getBalance } from "../../actions/checkBalance";
import { getTransactions } from "../../actions/getRecentTransactions";
import { setupWallet } from "../../actions/setWallet";
import Header from '../header';


class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            friends: undefined,
            userAddress: '',
            friendAddress: '',
            amount: '',
            balanceAddress: '',
            balance: undefined,
            sent: 'sent',
            recieved: 'received',
            transactions: undefined,
            walletId: ''

        }

        //    this.getAccessToken = this.getAccessToken.bind(this)

        this.displayProfile = this.displayProfile.bind(this);
        this.displayFriends = this.displayFriends.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendFund = this.sendFund.bind(this);
        this.getBalance = this.getBalance.bind(this);
        this.displayBalance = this.displayBalance.bind(this);
        this.getTransactions = this.getTransactions.bind(this);
        this.creatWallet = this.creatWallet.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    creatWallet(event) {
        event.preventDefault();
        this.props.setupWallet(this.state)
    }

    sendFund(event) {
        event.preventDefault();
        this.props.transferFund(this.state)
    }

    getBalance(address) {

        this.props.getBalance(address)
            .then(() => {
                this.setState({
                    balance: this.props.balance
                })
                console.log(this.state.balance)
            })
    }
    getTransactions(address) {
        this.props.getTransactions(address)
            .then(() => {
                this.setState({
                    transactions: this.props.transactions
                })
                console.log(this.state.transactions)
            });
    }
    
    componentDidMount() {
        if (this.props.loggedIn) {
            // const userId = this.props.user.sub
            this.props.getProfile()
                .then(() => {
                    this.setState({
                        user: this.props.userProfile
                    })
                })


            this.props.getFriends()
                .then(() => {
                    this.setState({
                        friends: this.props.friends
                    })

                })
        }
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSelect(event) {
        this.setState({ walletId: event.target.value });
    }


    displayTransactions() {
        if (this.state.transactions && this.state.transactions.length > 0) {
            return (
                this.state.transactions.map((tx, index) => {
                    return <div key={index}>
                        <ul class="list-group">
                            <li class="list-group-item">
                                <span>transaction reference No: {tx.tx_ref}</span><br/>
                                <span>status: <button className="btn btn-outline-success">{tx.status}</button></span><br/>
                                <span>type: {tx.type}</span>
                            </li>
                        </ul>
                    </div>
                })
            )
        } else {
            return (
                <div>No Recent Activity</div>
            )
        }
    }

    displayProfile() {
        if (this.state.user) {
            const { user } = this.state
            return (
                user.address.map((add, index) => {
                    return <div key={index}>
                        <a href="#" className="list-group-item list-group-item-action">{add.network} </a>

                        <div class="input-group mb-3">
                            <input type="text" class="form-control" value={add.address} disabled aria-describedby="button-addon2" />
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2"
                                    onClick={event => {
                                        event.preventDefault();
                                        this.getTransactions(add.address)
                                    }}
                                >recent transactions</button>
                                {/* <button class="btn btn-outline-secondary btn-sm" type="button" id="button-addon2"
                                    onClick={event => {
                                        event.preventDefault();
                                        this.getTransactions(add.address, this.state.recieved)
                                    }}
                                >recieved tx</button> */}
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2"
                                    onClick={event => {
                                        event.preventDefault();
                                        this.getBalance(add.address)
                                    }}
                                >check balance</button>
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2"
                                    onClick={event => {
                                        event.preventDefault();
                                        this.setState({
                                            userAddress: add.address
                                        })
                                    }}
                                >transfer from</button>
                            </div>
                        </div>
                    </div>


                })
            )
        }
    }

    displayBalance() {
        if (this.state.balance) {
            return (
                <div>
                    <span>network: <button className="btn btn-outline-primary">{this.state.balance.network}</button> </span>
                    <span>available balance: <button className="btn btn-outline-success">{this.state.balance.available_balance}</button> </span>
                    <span>pending_received_balance: <button className="btn btn-outline-warning">{this.state.balance.pending_received_balance}</button> </span>
                </div>
            )
        }

    }

    displayFriends() {
        if (this.state.user) {
            const { friends } = this.state
            return (
                friends.map((friend, index) => {
                    return <div key={index}>
                        <a href="#" className="list-group-item list-group-item-action active">{friend.username} </a>
                        <div class="input-group mb-3">
                            {friend.address.map((add, index) => {
                                return <div key={index}>
                                    <a href="#" className="list-group-item list-group-item-action">{add.network} </a>
                                    <div className="input-group mb-3">
                                        <input type="text" class="form-control" value={add.address} disabled aria-describedby="button-addon2" />
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary" type="button" id="button-addon2"
                                                onClick={event => {
                                                    event.preventDefault();
                                                    this.setState({
                                                        friendAddress: add.address
                                                    })
                                                }}
                                            >Tranfer to</button>
                                        </div>
                                    </div>

                                </div>

                            })}
                            <hr />
                        </div>
                    </div>

                })
            )
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <Header />
                <div className="row">

                    <div className="col-md-6 outter">
                        <div className="white">
                            <h5 className="center">balance:</h5>
                            {this.state.balance ? this.displayBalance() : <div></div>}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 outter">
                        <div className="white">
                            <div className="list-group">
                                <h5 className="center">My wallets</h5>

                                {
                                    this.state.user ? this.displayProfile() : 'You have no wallet'
                                }

                            </div>

                        </div>
                        {/* recent transaction */}
                        <div className="row">
                            <div className="col-md-12 outter">
                                <div className="white">
                                    <div class="list-group">
                                        <h5 className="center">Recent Transaction:</h5>
                                        {this.state.transactions ? this.displayTransactions() :
                                            <div></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 outter">
                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="center" style={{ textAlign: "center" }}>Create Wallet</h5>
                                <select class="custom-select custom-select-sm" value={this.state.walletId} onChange={this.handleSelect}>
                                    <option selected >Open this select menu</option>
                                    <option value="1">BITCOIN</option>
                                    <option value="2">LITECOIN</option>
                                    <option value="3">DOGECOIN</option>
                                </select>
                                <br/>
                                <br/>
                                <button className="btn btn-success" onClick={this.creatWallet}>create wallet</button>
                            </div>
                        </div>
                        <br />
                        <div className="white">
                            <form className="">
                                <h5 className="center" style={{ textAlign: "center" }}>Tranfer fund</h5>
                                <br />

                                <div className="form-group">
                                    <label for="userAddress">Your Address</label>
                                    <input type="text"
                                        name="userAddress"
                                        value={this.state.userAddress}
                                        // onChange={this.handleChange}
                                        disabled
                                        className="form-control"
                                        placeholder="select an address" />
                                </div>
                                <div className="form-group">
                                    <label for="friendAddress">receiver address</label>
                                    <input type="text"
                                        name="friendAddress"
                                        value={this.state.friendAddress}
                                        disabled
                                        // onChange={this.handleChange}
                                        className="form-control"
                                        placeholder="select receiver address" />
                                </div>

                                <div className="form-group">
                                    <label for="amount">amount</label>
                                    <input type="text"
                                        name="amount"
                                        value={this.state.amount}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        placeholder="amount" />
                                </div>

                                <button className="btn btn-success" onClick={this.sendFund}>Transfer</button>
                            </form>


                        </div>

                    </div>


                    <div className="col-md-4 outter ">
                        <div className="white">
                            <div className="list-group ">
                                <h5 className="center">Friend list</h5>
                                <div className="friends-list">
                                    {
                                        this.state.friends && this.state.friends.length > 0 ?
                                            this.displayFriends() : 'You have no friends'
                                    }
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        error: state.auth.error,
        user: state.auth.user,
        userProfile: state.auth.userProfile,
        friends: state.auth.friends,
        balance: state.auth.balance,
        transactions: state.auth.transactions
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getProfile, getFriends, transferFund,
        getBalance, getTransactions, setupWallet
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);



// export default HomePage;