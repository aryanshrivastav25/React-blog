import { useEffect, useState } from "react";
import storageService from "../appwrite/config";
import { Container, Postcard } from "../components";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {}, []);

    storageService.getPosts([])
    .then((posts) => {
        if (posts)
            setPosts(posts.documents);
    });

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

export default AllPosts;