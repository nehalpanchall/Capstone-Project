import Post from "./post"

const Home = () => {
    return <div>
        <img src='/assets/car.jpeg' style={{
            width: '100%',
            height: '600px',
            objectFit: 'cover'
        }} />
        <div className="mt-3 mb-3">
            <Post />
        </div>
    </div>
}

export default Home
