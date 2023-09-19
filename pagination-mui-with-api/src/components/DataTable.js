import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 230 },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'body', headerName: 'Description', width: 600 },
];

export default function DataTable() {
    const [post, setPost] = useState();

    const getList = async () => {
        let allList = await axios.get('https://jsonplaceholder.typicode.com/comments');
        allList = allList.data;
        setPost(allList)
    }

    useEffect(() => {
        getList();
    }, [])


    return (
        <div style={{ height: 400, width: '100%', maxWidth: '1200px', margin: 'auto' }}>
            {
                post && post.length > 0 &&
                <DataGrid
                    rows={post}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    checkboxSelection
                />
            }

        </div>
    );
}