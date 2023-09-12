import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function Admin() {
    const [token, setToken] = useState();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
        setLoading(false); // Move setLoading(false) to after setting the token
    },[]);

    useEffect(() => {
        async function fetchContData() {
            try {
                await fetch('https://dunyasehirlericom-598d89e9dae9.herokuapp.com/list-continent', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                // Handle the response data here
                setData(data);
      })
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }
        if(token){fetchContData();}
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {data.map((x) => (
                <Table striped bordered hover key={x._id}>
                    <thead>
                        <tr>
                            <th key={x.title}>{x.title}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {x.categories.map((y) => (
                            <tr key={y._id}>
                                <td>{y.title}</td>
                                {y.articles.map((z) => (
                                    <td key={z.title}>{z.title}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ))}
        </>
    );
}

export default Admin;
