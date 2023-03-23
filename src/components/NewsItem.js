import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, newsSource } = this.props
        return (
            <>
                <div className="card my-2">

                    <div className="container newsSourceBadge">
                        <span className="badge bg-success"> {newsSource} </span>
                    </div>

                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body fontSensSerif">
                        <h5 className="card-title fontBold">{title}{title.length < 45 ? "" : "..."}</h5>
                        <p className="card-text">{description}{title.length < 88 ? "" : "..."}</p>
                        <p className="card-text" style={{}}><small className="card-muted">By {author ? author : "Unknown"} on {new Date(date).toDateString()}</small></p>
                        <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-success">Readmore..</a>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem