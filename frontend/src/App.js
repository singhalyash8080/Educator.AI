import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from './component/Dashboard/dashboard.component';
import Dashboard1 from './component/Dashboard/dashboard_1.component';
import Exam from './component/exam.component';
import Hero from "./component/Hero section/hero";
import Login from "./component/login";
import LoginTeacher from "./component/loginTeacher";
import Register from './component/register';
import RegisterTeacher from './component/register-teacher';
import Error from './component/error_general'
import Result from './component/result.component';
import { Provider } from 'react-redux';
import store from './store'
import SearchFacutly from './component/searchFacutly';
function App() {  
  return (
    <>
      <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <Switch>
            <Route path="/" exact component={Hero} />
              <Route path="/login" exact component={Login} />
              <Route path="/loginTeacher" exact component={LoginTeacher} />
              <Route path="/register" exact component={Register} />
              <Route path="/registerTeacher" exact component={RegisterTeacher} />
              <Route path='/dashboard' exact component={Dashboard} />
              <Route path='/dashboard1' exact component={Dashboard1} />
              <Route exact path='/main-exam' component={Exam} />
              <Route exact path='/result' component={Result} />
              <Route exact path='/searchFaculty' component={SearchFacutly} />
              <Route component={Error} />
            </Switch>


        </div>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
