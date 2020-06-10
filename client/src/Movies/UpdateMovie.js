import React, { useState , useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';


const UpdateMovie = (props) => {
    //console.log(props)
    const { id } = useParams();
    const { push } = useHistory();
    const [item, setItem] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    })


    const handleChange = e => {
        // const value = e.target.value
        // if(e.target.value === 'stars') {
        //    value = Array.from(value.spilt(','));
        // }
        //console.log()
        setItem({
            ...item,
            [e.target.name]: e.target.value
        })
    }
    

    useEffect(() => {
        
        const itemToEdit = props.movieList.find(e => `${e.id}` === id)
        if(itemToEdit) {
            setItem(itemToEdit);
        }
        console.log(itemToEdit)
    }, [props.movieList, id])


    const handleSubmit = e => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, item)
            .then(res => {
                console.log(res.data)
                props.setMovieList([res.data].concat(props.movieList.filter(item => `${item.id}` !== id)))
                push(`/`)
            })

    }
    return (
        <div className="update-cont">
            <h2>Update Movie</h2>
            <div className="form-cont">
                <form onSubmit={handleSubmit} className="form">
                    <label>Title</label><input type="text" name="title" value={item.title} onChange={handleChange} placeholder="Title" />
                    <label>Director</label><input type="text" name="director" value={item.director} onChange={handleChange} placeholder="Director" />
                    <label>Metascore</label><input type="text" name="metascore" value={item.metascore} onChange={handleChange} placeholder="Metascore" />
                    <label>Stars</label><input type="text" name="stars" value={item.stars} onChange={handleChange} placeholder="Stars" />
                    <button className="edit">Edit</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateMovie;
