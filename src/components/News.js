import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles = [
        { author: "sailendra", url: "https://source.unsplash.com/random/?computer0/", title: "This is title This is title This is title This is title This is title This is title This is title This is title This is title This is title This is title This is title This is title This is title This is title This is title This is title This is title ", description: "this is description this is description this is description this is description this is description this is description this is description this is description this is description this is description this is description this is description this is description this is description this is description this is description this is description this is description this is description this is description this is description this is description this is description ", newsUrl: "https://tanalyzer-site.netlify.app" },
        { author: "sailendra", url: "https://source.unsplash.com/random/?Cryptocurrency1/", title: "This is title", description: "this is description", newsUrl: "https://tanalyzer-site.netlify.app" },
        { author: "sailendra", url: "https://source.unsplash.com/random/?bikes2/", title: "This is title", description: "this is description", newsUrl: "https://tanalyzer-site.netlify.app" },
        { author: "sailendra", url: "https://source.unsplash.com/random/?cars3/", title: "This is title", description: "this is description", newsUrl: "https://tanalyzer-site.netlify.app" }
    ]
    constructor() {
        super();
        this.state = {
            articles: this.articles
        }
    }
    render() {
        return (
            <>

                <div className="container my-3">
                    <h2>Top Headlines - newsMonkey</h2>
                    <div className="row">
                        {
                            this.state.articles.map((element) => {
                                return <div div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title.slice(0, 45)} description={element.description.slice(0, 88)} imageUrl={element.url} newsUrl={element.newsUrl} />
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