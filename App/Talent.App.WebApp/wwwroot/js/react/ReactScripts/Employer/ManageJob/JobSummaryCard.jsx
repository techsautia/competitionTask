import React from 'react';
import Cookies from 'js-cookie';
import { Popup, Card, Label, Icon, Button } from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.selectJob = this.selectJob.bind(this)
    // }

    // selectJob(id) {
    //     var cookies = Cookies.get('talentAuthToken');
    //     //url: 'http://localhost:51689/listing/listing/closeJob',
    // }

    render() {
        const { job } = this.props;

        return (
        
            <Card className="extra card-content" key={job.id}>
                <Card.Content>
                <Card.Header>{job.title}</Card.Header>

                <Label ribbon="right" color="black">
                    <Icon name="user"></Icon>
                    {/* {suggestions} */}
                    </Label>
                <Card.Meta>
                    <span className='date'>{job.location.city}, {job.location.country}</span>
                </Card.Meta>
                <Card.Description className="description job-summary">
                    {job.summary}
                </Card.Description >
                </Card.Content>
                <Card.Content extra>
                    {job.status == 'expired' ? <Label color='red' size='medium'>Expired</Label> : ""}
                    
                        <Button basic color='blue' size='mini' floated="right" onClick={this.props.handleJobClosed}><Icon name='ban'/>Close</Button>
                        <Button basic color='blue' size='mini'floated="right" onClick={this.props.handleJobEdit}><Icon name='edit outline'/>Edit</Button>
                        <Button basic color='blue' size='mini'floated="right" onClick={this.props.handleJobCopy}><Icon name='copy outline'/>Copy</Button>
                    
                </Card.Content>
            </Card>
        )
        
    }
}