import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    defaultImage = "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"
    static defaultProps = {
        country: "in",
        pageSize: 6,
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
            loading: true,
            totalResults: 0
        }
        document.title = `${this.props.category === 'general' ? "News Monkey - get the latest news for free" : this.captializeFirstLetter(this.props.category)} latest news - NewsMonkey`
    }

    async updateNews() {
        this.props.setProgress(24)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3104946bd90a4c738d1a1e4d7dc35012&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true })
        let data = await fetch(url)
        this.props.setProgress(57)
        let parsedData = await data.json()
        this.props.setProgress(77)

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }

    async componentDidMount() {
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3104946bd90a4c738d1a1e4d7dc35012&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };

    render() {
        return (
            <>
                <div className="container my-3">
                    <h2 className='my-3 fontSensSerif'> NewsMonkey - Top {this.captializeFirstLetter(this.props.category)} headlines </h2>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container">
                            <div className="row">
                                {
                                    this.state.articles.map((element) => {
                                        return <div className="col-md-4" key={Math.random()}>
                                            <NewsItem title={element.title ? element.title.slice(0, 45) : "Not available"} description={element.description ? element.description.slice(0, 88) : "Not available"} imageUrl={!element.urlToImage ? this.defaultImage : element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} newsSource={element.source.name} />
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </InfiniteScroll>

                </div>
            </>
        )
    }
}

export default News