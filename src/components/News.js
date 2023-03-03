import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles = []

    constructor() {
        super();
        this.state = {
            articles: this.articles
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=3104946bd90a4c738d1a1e4d7dc35012";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles });
        console.log(parsedData);
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
                </div>
            </>
        )
    }
}

export default News