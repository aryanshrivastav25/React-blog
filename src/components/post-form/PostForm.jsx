import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from '../index'
import storageService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, reset } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    });
    console.log("All values: ", getValues());

    const navigate = useNavigate();
    const userData = useSelector(state => { return state.userData });

    const submit = async (data) => {
        if (post) {
            reset({
                title: post.title,
                slug: post.slug,
                content: post.content,
                status: post.status,
            });
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null;
            if (file)
                storageService.deleteFile(post.featuredImage);

            const dbPost = await storageService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage
            });


            navigate(`/post/${dbPost.$id}`)
        }
        else {
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null;

            if (file) {
                const file_id = file.$id;
                data.featuredImage = file_id;
            }
            else
                data.featuredImage = null;

            const dbPost = await storageService.createPost({
                ...data,
                user_id: userData.$id
            });

            if (dbPost)
                navigate(`/post/${dbPost.$id}`)
        }

    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d]+/g, '-'); // ^ is negation, [a-zA-Z\d] mean all character from a to z, A to Z and all digits, ^[a-zA-Z\d] means match all character except these characters and + means match any other remaining characters, and the replace function replaces those matched characters with '-', /g is global match
        // or we can use .replace(/\s/g, '-'), means match all spaces and replace it with '-'
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title')
                setValue('slug', slugTransform(value.title, { shouldValidate: true }));
        })
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue])
        ;
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label='Title: '
                    placeholder='Title'
                    className='mb-4'
                    {...register('title', { required: true })}
                />
                <Input
                    label='Slug: '
                    placeholder='Slug'
                    className='mb-4'
                    value={slugTransform(getValues('title'))}
                    {...register('slug', { required: true })}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label='Content: ' name='content' control={control} defaultValue={getValues('content')} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label='Featured Image: '
                    type='file'
                    className='mb-4'
                    accept='image/png, image/jpg, image/jpeg, image/gif'
                    {...register('image', { required: !post })}
                />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={storageService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={['active', 'inactive']}
                    label="Status"
                    className='mb-4'
                    {...register('status', { required: true })}
                />

                <Button type='submit' bgColor={post ? 'bg-green-500' : undefined} className="w-full">
                    {post ? 'Update' : 'Submit'}
                </Button>
            </div>
        </form>
    )
}

export default PostForm;