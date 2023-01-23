import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Button, Card, Label, Container } from 'semantic-ui-react';
import { filterOptions, dateOptions } from '../common.js';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData;
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            job: {
                id: "",
                title: "",
                summary: "",
                country: "",
                city: "",
                status: "",
                noOfSuggestions: ""
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 0,
            jobsPerPage: 6,
            activeIndex: 1,
            filterValue: "showClosed",
            pageSize: 3,
            begin: 0,
            end: 3,
        }


        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.toggleSortDate = this.toggleSortDate.bind(this);
        this.filterReset = this.filterReset.bind(this);
        this.handleJobEdit = this.handleJobEdit.bind(this);
        this.handleJobClosed = this.handleJobClosed.bind(this);
        this.handleJobCopy = this.handleJobCopy.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        //your functions go here
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        // this.setState({ loaderData });//comment this
        console.log({loaderData});
        
        //set loaderData.isLoading to false after getting data
        this.loadData(() =>
           this.setState({ loaderData })
        )

        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        //  this.init();
         this.loadData();
    };

    loadData(callback) {
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        var loader = this.state.loaderData;

        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies
            },
            data:{
                activePage: this.state.activePage,
                sortbyDate: this.state.sortBy.date,
                showActive: this.state.filter.showActive,
                showClosed: this.state.filter.showClosed,
                showDraft: this.state.filter.showDraft,
                showExpired: this.state.filter.showExpired,
                showUnexpired: this.state.filter.showUnexpired,
            },
            type: "GET",
            contentType: "application/json",            
            dataType: "json",
            success: function (res) {
                if(res.success){
                    console.log(res);
                    console.log("Successful ");
                    loader.isLoading = false;
                    this.setState({loadJobs: res.myJobs, totalPages: Math.ceil(res.totalCount/this.state.jobsPerPage), loadData: loader});
                    
                }
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
        // this.init()
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })                
            })
        });
    }

    filterReset(){
        this.setState({filter: {
            showActive: true,
            showClosed: false,
            showDraft: true,
            showExpired: true,
            showUnexpired: true
        }});
    }

    handleFilter(e, {value}){
        console.log('Filter Clicked');
        console.log(value);
        if(value != "desc" && value != "asc"){
            this.setState({filterValue:value});
        }

        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        var loader = this.state.loaderData;

        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies
            },
            data:{
                activePage: this.state.activePage,
                sortbyDate: value == "desc" ? false : this.state.sortBy.date,
                showActive: value == "showActive" ? false : this.state.filter.showActive,
                showClosed: value == "showClosed" ? false : this.state.filter.showClosed,
                showDraft: value == "showDraft" ? false : this.state.filter.showDraft,
                showExpired: value == "showExpired" ? false : this.state.filter.showExpired,
                showUnexpired: value == "showUnexpired" ? false : this.state.filter.showUnexpired,
            },
            type: "GET",
            contentType: "application/json",            
            dataType: "json",
            success: function (res) {
                if(res.success){
                    loader.isLoading = false;
                    this.setState({loadJobs: res.myJobs, totalPages: Math.ceil(res.totalCount/this.state.jobsPerPage), loadData: loader});
                    
                }
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
    }

    toggleSortDate(e, {value}){
        console.log("Sort Date Clicked");
        console.log(value);

    }

    handleJobEdit(jobData){
        console.log("Handle Job Edit");
        console.log(jobData);
    }

    handleJobClosed(jobData){
        console.log("Handle Job Close");
        console.log(jobData);

    }

    handleJobCopy(jobData){
        console.log("Handle Job Copy");
        console.log(jobData);

    }

    handlePageChange(e, {activePage}) {
        this.setState({activePage: activePage, activeIndex: activePage})
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        var loader = this.state.loaderData;

        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies
            },
            data:{
                activePage: activePage,
                sortbyDate: this.state.sortBy.date,
                showActive: this.state.filter.showActive,
                showClosed: this.state.filter.showClosed,
                showDraft: this.state.filter.showDraft,
                showExpired: this.state.filter.showExpired,
                showUnexpired: this.state.filter.showUnexpired,
            },
            type: "GET",
            contentType: "application/json",            
            dataType: "json",
            success: function (res) {
                if(res.success){
                    console.log(res);
                    console.log("Successful ");
                    loader.isLoading = false;
                    this.setState({loadJobs: res.myJobs, totalPages: Math.ceil(res.totalCount/this.state.jobsPerPage), loadData: loader});
                    
                }
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
        
      }

    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
               <div className ="ui container">
                    <h3>List of Jobs</h3>

                    <div>
                        <Icon name="filter"/>
                        Filter:
                        <span>
                        <Dropdown
                            inline
                            options={filterOptions}
                            placeholder="Choose filter"
                            name="filter"
                            value={this.state.filterValue}
                            onChange={this.handleFilter}
                        />
                        </span>
                        <Icon name="calendar" />
                        Sort by date:
                        <span>
                        <Dropdown
                        inline
                        placeholder="Newest first"
                        name="dateFilter"
                        value={this.state.value}
                        onChange={this.handleFilter}
                        options={dateOptions}
                        />
                    </span>


                    </div>
                    <br />
                    <br />
                    <div >
                    {this.state.loadJobs.length > 0 ? (
                        
                        //Loading Job Cards
                        <Card.Group  itemsPerRow={3} className="ui cards">
                            {this.state.loadJobs.map((job, index) => (
                            
                         <JobSummaryCard 
                            key={index}
                            jobExpiryDate={job.expiryDate}
                            job = {job}
                            handleJobEdit={() => this.handleJobEdit(job)}
                            handleJobClosed={() => this.handleJobClosed(job)}
                            handleJobCopy={() => this.handleJobCopy(job)}
                         />       
                            
                    ))}</Card.Group>
                    ) : (//No Job Cards
                        <p>No Jobs Found!</p>
                    )}
                    </div>
                    <br />
                    {/* Pagination */}
                    <Container textAlign='center'>
                    <Pagination activePage={this.state.activePage} totalPages={this.state.totalPages} onPageChange={this.handlePageChange} />
                    </Container>
                    <br />
               </div>
            </BodyWrapper>
        )
    }
}
