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

    captializeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            page: 1,
            loading: false
        }
        document.title = `${this.props.category === 'general' ? "News Monkey - get the latest news for free" : this.captializeFirstLetter(this.props.category)} latest news - NewsMonkey`
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3104946bd90a4c738d1a1e4d7dc35012&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    async componentDidMount() {
        this.updateNews()
    }

    goToNextPage = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews()
        console.log(this.state.articles);
    }

    goToPreviousPage = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }

    render() {
        return (
            <>
                <div className="container my-3">
                    <h2 className='my-3 fontSensSerif'> NewsMonkey - Top {this.captializeFirstLetter(this.props.category)} headlines </h2>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {
                            (!this.state.loading) && this.state.articles.map((element) => {
                                return <div div className="col-md-4" key={element.imageUrl}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : "Not available"} description={element.description ? element.description.slice(0, 88) : "Not available"} imageUrl={!element.urlToImage ? "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" : element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
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