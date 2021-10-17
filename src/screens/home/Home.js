import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({

    upcomingMoviesHead: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
    },
    gridListUpMovies: {
        width: '100%'
    },

    formControl: {
        minWidth: 240,
        maxWidth: 240
    },

});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            movieName: "",
            upcomingMovies: [],
            releasedMovies: [],
            genres: [],
            artists: [],
            genresList: [],
            artistsList: [],
            releaseDateStart: "",
            releaseDateEnd: ""
        }

    }

    componentWillMount() {
  
        let movieData = null;
        let httpReq = new XMLHttpRequest();
        let that = this;
        httpReq.addEventListener("readystatechange", function () {
                     that.setState({
                    upcomingMovies: JSON.parse(this.responseText).movies
                });
            
        });

        httpReq.open("GET", this.props.baseUrl + "movies?status=PUBLISHED");
        httpReq.send(movieData);


        let movieDataGenres = null;
        let httpReqGenres = new XMLHttpRequest();
        
        httpReqGenres.addEventListener("readystatechange", function () {
            
                that.setState({
                    genresList: JSON.parse(this.responseText).genres
                });
            
        });

        httpReqGenres.open("GET", this.props.baseUrl + "genres");
        httpReqGenres.send(movieDataGenres);

    }

    movieNameChangeHandler = event => {
        this.setState({ movieName: event.target.value });
    }

    genreSelectHandler = event => {
        this.setState({ genres: event.target.value });
    }


    movieClickHandler = (movieId) => {
        this.props.history.push('/movie/' + movieId);
    }

    filterApplyHandler = () => {
        let queryString = "?status=RELEASED";
        if (this.state.movieName !== "") {
            queryString += "&title=" + this.state.movieName;
        }
        if (this.state.genres.length > 0) {
            queryString += "&genres=" + this.state.genres.toString();
        }
 

      
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header baseUrl={this.props.baseUrl} />

                
                    <span>Upcoming Movies</span>
              

                <GridList cols={5} className={classes.gridListUpcomingMovies} >
                    {this.state.upcomingMovies.map(movie => (
                        <GridListTile key={"upcoming" + movie.id}>
                            <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                            
                        </GridListTile>
                    ))}
                </GridList>

                <div className="flex-container">
                    <div className="left">
                        <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
                            {this.state.releasedMovies.map(movie => (
                                <GridListTile onClick={() => this.movieClickHandler(movie.id)}  key={"grid" + movie.id}>
                                    <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                        
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>


                    <div className="right">
                        <Card>
                            <CardContent>
                                <FormControl className={classes.formControl}>
                                    <Typography className={classes.title} color="textSecondary">
                                        FIND MOVIES BY:
                                    </Typography>
                                </FormControl>


                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <Button onClick={() => this.filterApplyHandler()}  color="primary">
                                        APPLY
                                    </Button>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div >
        )
    }
}

export default withStyles(styles)(Home);