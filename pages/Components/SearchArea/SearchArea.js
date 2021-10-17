import react, { Component } from 'react';
import { Button, IconButton } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';


const BASE_URL = "https://compressor.ai/";
class SearchArea extends Component{

    constructor(props){
        super(props);
        this.state={
            text: "",
            outputText: "",
            loading: false,
        };
    }

    componentDidMount(){
        document.getElementById("inputBox").focus();
        document.getElementById("inputBox").addEventListener('keypress', this.enterKeyHandler);
    }

    componentWillUnmount(){
        document.getElementById("inputBox").removeEventListener("keypress", this.enterKeyHandler);
    }

    enterKeyHandler = (e) =>{
        if (e.key === 'Enter') {
            if(this.state.text.length > 0){
                this.clickHandler()
            }
        }
    }

    inputBoxHandler = (e) => {
        let text = e.target.value;
        this.setState({
            text: text,
        });
    }

    clickHandler = () => {
        const text = this.state.text;
        if(text.substring(0,22) === BASE_URL){
            const slug = text.substring(28, text.length);
            if(slug.length > 6){
                NotificationManager.error('Incorrect slug!');
            }
            else{
                this.setState({
                    outputText: null,
                    loading: true,
                }, () => {
                    fetch(`https://smiles-kappa.vercel.app/?slug=${slug}`)
                    .then(response => response.json())
                    .then(data => {
                        if(data.url){
                            this.setState({
                                outputText: data.url,
                            });
                            NotificationManager.success('Copied to clipboard', 'Url fetched successfully!');
                            navigator.clipboard.writeText(data.url);
                        }
                        else{
                            NotificationManager.warning('Slug not found!');
                        }
                        
                    })
                    .catch(err => {
                        NotificationManager.error('Error fetching URL');
                    })
                    .finally(res => {
                        this.setState({
                            loading: false,
                        })
                    })
                })
            }
        }
        else{
            let data = {url: text};
            let formData = new FormData();
            formData.append('url', text);
            this.setState({
                outputText: null,
                loading: true,
            }, () => {
                fetch('https://smiles-kappa.vercel.app/', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                    const slug = `${BASE_URL}?slug=${data.key}`;
                    this.setState({
                        outputText: slug,
                    });
                    NotificationManager.success('Copied to clipboard', 'Slug generated successfully!');
                    navigator.clipboard.writeText(slug);
                })
                .catch(err => {
                    NotificationManager.error('Error generating slug');
                })
                .finally(res => {
                    this.setState({
                        loading: false,
                    })
                })
            });
        }
    }

    render(){
        return(
            <div className={"display-flex height-100 align-items-center"}>
                <NotificationContainer/>
                <div className="width-100-vw">
                    <div className="display-flex justify-content-center">
                        <div>
                            <div className="margin-bottom-md">
                                Enter Url or slug
                            </div>
                            <div className="display-flex align-items-center">
                                <input 
                                    type="text"
                                    value={this.state.text}
                                    className={
                                        ("padding-xlg border border-2 width-60-vw height-40-px ")+
                                        ("border-radius-20 bold font-150 avenir")
                                    }
                                    id="inputBox"
                                    onChange={this.inputBoxHandler}
                                />
                                <div>
                                    <div 
                                        className={
                                            ("border-1  border-radius-50p margin-left-md ")+
                                            (this.state.loading ? "background-grey" : "background-black")
                                        }
                                        onClick = {!this.state.loading && this.clickHandler}
                                    >
                                        <IconButton aria-label="delete">
                                            <SendIcon sx={{"color": "yellow"}}/>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                            {this.state.loading && (
                                <div className={"display-flex justify-content-center margin-top-lg"}>
                                    Loading...
                                </div>
                            )}
                            {this.state.outputText && (
                                <>
                                    <div className={"margin-top-lg"}>
                                        Your URL / Slug
                                    </div>
                                    <div 
                                        className={
                                            ("margin-top-lg font-200 display-flex justify-content-center ")+
                                            ("border-1 border-radius-30 background-light-grey color-blue padding-small")
                                        }
                                    >
                                        {this.state.outputText}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchArea;