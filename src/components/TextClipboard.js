import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {IconButton, Snackbar} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import './styles/textclipboard.css';

export class TextClipboard extends Component{
    state = {
        copiedNotification: false
    }
    closeSnackbar = () => {
        this.setState({ copiedNotification: false });
    };
    copy = () => {
        if (navigator.share) {
            navigator.share({
                title: 'My Boba Watch Profile',
                text: 'Check out my boba spending!',
                url: this.props.text,
            }).catch((error) => {
                this.setState({ copiedNotification: true });
            })
        }else{
            this.setState({ copiedNotification: true });
        }
          
    }
    render() {
        return (
        <div className="clipboard">
            <div className="clipboard-text" id="copy-me">
                {this.props.text}
            </div>
            <CopyToClipboard text={this.props.text} >
                <IconButton style={{padding: 0}} className="clipboard-icon" onClick={this.copy}>
                    <FileCopyIcon style={{fontSize: 14}}/>
                </IconButton>
            </CopyToClipboard>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.state.copiedNotification}
                autoHideDuration={4000}
                onClose={this.closeSnackbar}
                message={<span>Link Copied!</span>}
            />
        </div>
        )
    }
}

export default TextClipboard;
