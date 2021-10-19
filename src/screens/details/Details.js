import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import './Details.css';
import YouTube from 'react-youtube';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            movie: {
                genres: [],
                trailer_url: "",
                artists: []
            },
            starIcons: [{
                id: 1,
                stateId: "star1",
                
            },
            {
                id: 2,
                stateId: "star2",
                
            },
            {
                id: 3,
                stateId: "star3",
                
            },
            {
                id: 4,
                stateId: "star4",
                
            },
            {
                id: 5,
                stateId: "star5",
                
            }]
        }
    }

    componentWillMount() {
        let that = this;
        let dataMovie = null;
        let httpMovie = new XMLHttpRequest();
        httpMovie.addEventListener("readystatechange", function () {
           
                that.setState({
                    movie: JSON.parse(this.responseText)
                });
            
        });

        httpMovie.open("GET", this.props.baseUrl + "movies/" + this.props.match.params.id);
        httpMovie.send(dataMovie);
    }




    render() {
        let movie = this.state.movie;
        return (
            <div className="details">
                <Header id={this.props.match.params.id} baseUrl={this.props.baseUrl} showBookShowButton="true" />
                <div className="back">
                    <Typography>
                        <Link to="/">  &#60; Back to Home</Link>
                    </Typography>
                </div>
                <div className="flex-containerDetails">
                    <div>
                        <img src={movie.poster_url} alt={movie.title} />
                    </div>

                    <div >
                        <div>
                            <Typography variant="headline" component="h2">{movie.title} </Typography>
                        </div>
                        <br />
                        <div>
                            <Typography>
                                <span className="bold">Genres: </span> {movie.genres}
                            </Typography>
                        </div>
                      
                        <div>
                            <Typography><span className="bold">Release Date:</span> {new Date(movie.release_date).toDateString()} </Typography>
                        </div>
                        <div>
                            <Typography><span className="bold"> Rating:</span> {movie.critics_rating}  </Typography>
                        </div>
                      
                        <div >
                            <Typography>
                                <span className="bold">Trailer:</span>
                            </Typography>
  
                        </div>
                    </div>

                    <div >
        
                        <div >
                            <Typography>
                                <span className="bold">Artists:</span>
                            </Typography>
                        </div>
                        <div className="paddingRight">
                      
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;