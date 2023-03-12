import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }


    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            loading: false
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3104946bd90a4c738d1a1e4d7dc35012&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
    }

    goToNextPage = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            this.setState({ loading: true })

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3104946bd90a4c738d1a1e4d7dc35012&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();

            this.setState({ loading: false })

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

    goToPreviousPage = async () => {
        this.setState({ loading: true })

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3104946bd90a4c738d1a1e4d7dc35012&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({ loading: false })

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })

    }

    render() {
        return (
            <>
                <div className="container my-3">
                    <h2 className='my-3'>Top Headlines - newsMonkey</h2>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {
                            (!this.state.loading) && this.state.articles.map((element) => {
                                return <div div className="col-md-4" key={element.imageUrl}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : "Not available"} description={element.description ? element.description.slice(0, 88) : "Not available"} imageUrl={!element.urlToImage ? "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" : element.urlToImage} newsUrl={element.url} />
                                </div>
                            })
                        }
                    </div>
                    <div className="container d-flex justify-content-between my-3">
                        <button type='buttom' className='btn btn-dark' onClick={this.goToPreviousPage} disabled={this.state.page <= 1}>&larr; Previous</button>
                        <button type='buttom' className='btn btn-dark' onClick={this.goToNextPage} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}>Next &rarr; </button>
                    </div>
                </div>
            </>
        )
    }
}

export default News