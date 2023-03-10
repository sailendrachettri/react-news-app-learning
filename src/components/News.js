import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=3104946bd90a4c738d1a1e4d7dc35012&page=1&pageSize=12";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
    }

    goToNextPage = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 12)) {
            // console.log("end");
        }
        else {

            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3104946bd90a4c738d1a1e4d7dc35012&page=${this.state.page + 1}&pageSize=12`;
            let data = await fetch(url);
            let parsedData = await data.json();

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
            })
        }
    }

    goToPreviousPage = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3104946bd90a4c738d1a1e4d7dc35012&page=${this.state.page - 1}&pageSize=12`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
        })

    }

    render() {
        return (
            <>
                <div className="container my-3">
                    <h2>Top Headlines - newsMonkey</h2>
                    <div className="row">
                        {
                            this.state.articles.map((element) => {
                                return <div div className="col-md-4" key={element.imageUrl}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : "Not available"} description={element.description ? element.description.slice(0, 88) : "Not available"} imageUrl={!element.urlToImage ? "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" : element.urlToImage} newsUrl={element.url} />
                                </div>
                            })
                        }
                    </div>
                    <div className="container d-flex justify-content-between my-3">
                        <button type='buttom' className='btn btn-dark' onClick={this.goToPreviousPage} disabled={this.state.page <= 1}>&larr; Previous</button>
                        <button type='buttom' className='btn btn-dark' onClick={this.goToNextPage}>Next &rarr; </button>
                    </div>
                </div>
            </>
        )
    }
}

export default News