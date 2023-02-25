import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl } = this.props
        return (
            <>
                <div className="card" style={{ width: '18rem' }}>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}{title.length < 45 ? "" : "..."}</h5>
                        <p className="card-text">{description}{title.length < 88 ? "" : "..."}</p>
                        <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-primary">Readmore..</a>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem