import react, { Component } from 'react';

class Title extends Component{

    render(){
        return(
            <div className={"display-flex align-items-center height-100 "}>
                <div className={"width-100-vw"}>
                    <div className={"display-flex justify-content-center"}>
                        Welcome to the 
                    </div>
                    <div className={"display-flex justify-content-center bold font-200"}>
                        Compressor!
                    </div>
                </div>
            </div>
        )
    }
}

export default Title;