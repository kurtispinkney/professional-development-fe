import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';

import ArticlesListPage from "./Pages/ArticlesListPage";
import ArticlePage from "./Pages/ArticlePage";
import WxProjectPage from "./Pages/WxProjectPage";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

  }

  getResumeData(){
    $.ajax({
      url:'/resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount(){
    this.getResumeData();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
          <Route path="/" exact>
          <Header data={this.state.resumeData.main}/>
          <About data={this.state.resumeData.main}/>
          <Resume data={this.state.resumeData.resume}/>
          <Footer data={this.state.resumeData.main}/>
          </Route>
          <Route path="/articles">
            <ArticlesListPage />
          </Route>
          <Route path="/article/:name">
            <ArticlePage />
          </Route>
          <Route path="/wxproject">
            <WxProjectPage />
          </Route>
          </Switch>
        </div>
    </BrowserRouter>
    );
  }
}

export default App;
