const Score = ({ title, score }) => {
    return (
        <div className="Score">
            <div className="Title">{title}</div>
            <div className="scoreNum">{score}</div>
        </div>
    )
}

export default Score;