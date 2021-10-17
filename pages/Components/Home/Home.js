import react, { Component } from 'react';
import Title from "../Title/Title";
import SearchArea from "../SearchArea/SearchArea";


class Home extends Component{

    render(){
        return(
            <>  
                <div className={"background-primary height-40-vh width-100-vw"}>
                    <Title />
                </div>
                <div className={"height-60-vh"}>
                    <SearchArea />
                </div>
            </>
        )
    }
}

export default Home;