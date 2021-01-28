import React , { Component } from 'react';
import Template from './Template';
import './TemplateList.css';


class TemplateList extends Component {
   
    constructor(props){
        super(props);
        
        this.state = {
         
        }

        this.add = this.add.bind(this);
        this.nextId = this.nextId.bind(this);


    }

    componentDidMount(){
        const that = this;
        let data = [];
        async function fetchData(){
            try{
                data = await fetch("https://task--it.herokuapp.com/api/tasks/:templateID").then(res =>res.json());
            }
            catch(err){
                console.log(`Error while fetching data from server: (${err})`);
            }
        }

        data.map(item => this.add({templateID: item.templateID, userID: item.userID, category: item.category, subTask: item.subTask}));
    }

    

    add( {templateID = '',userID='', completed='',,category='default category', subTask='default subTask', city='default city' } ) {
        this.setState(prevState => ({
            trucks: [
                ...prevState.trucks, {
                    id: id !== null ? id : this.nextId(prevState.trucks),
                    date: date,
                    category: category,
                    subTask: subTask

                }],

                fields: {id: null, date:"", fullName:"",city:"" }
            }
           
        ))
    }

    nextId(trucks = []) {
        let max = trucks.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id , 0); 
        return ++max;   
    }
    
    render() {
        return (
        <div className="templateList">
            <Template add={this.add}/>
        </div> 
        
        )
    }
}

export default TemplateList;