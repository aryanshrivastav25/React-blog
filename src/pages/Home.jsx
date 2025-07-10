import { useEffect, useState } from "react";
import storageService from "../appwrite/config";
import { Container, Postcard } from "../components";



function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        storageService.getPosts()
        .then((posts) => 
            {
                if (posts) 
                    setPosts(posts.documents)
            })
    }, []);
    if (posts.length === 0)
        return (
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            No Posts Found
                        </h1>
                    </div>
                </div>
            </Container>
    )
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="m-5">
                            <Postcard {...post} className='p-2 w-1/4' />
                        </div>
                    ))} 
                </div>
            </Container>
        </div>
    )
}

export default Home;