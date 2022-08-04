import React, { useEffect, useState } from 'react'
import "./contactList.css"
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import AdminWrapper from '../../layouts/AdminWrapper';
import api from '../../services/api';

export default function ContactList() {

    const columns = [
        { field: 'fullname', headerName: 'Full name', width: 200 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'phone_no', headerName: 'Phone_no', width: 150 },
        {
            field: 'message',
            headerName: 'Message',
            width: 250,
        },
        {
            field: "action", headerName: "Action", width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/admin/contact/" + params.row.id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row.id)} />
                    </>
                )
            }
        }
    ];

    const [contactData, setContactData] = useState([]);
    const [loading, setLoading ] = useState(true)

    useEffect(()=>{
        api.get('/api/contact-get-all/')
        .then(res=>{
          if(res.status === 200){
            console.log('data got', res.data)
            setContactData(res.data);
            setLoading(false)
            console.log(contactData)
          }else{
            console.log('error')
          }
        })
      },[]);// if any parameters present inside [] and if changes occur in the parameters then the useEffect code will trigger again and again

    const handleDelete = (id) => {
        // setContactData(contactData.filter(item => item.id !== id));
        console.log(id)
        api.delete("/api/contact/" + id)
        .then(res => {
          if (res.status === 200) {
            console.log('Successfully deleted')
            setContactData(prev=>prev.filter(item=>item.id!==id))
          } else {
            console.log('error')
          }
        })
        .catch(err => {
          console.log(err)
        })
    };

    return (
        <AdminWrapper>
            <div className='contactList'>
                <div className="createContact">
                    <Link to="/admin/newContact">
                        <button className="contactUserAddButton">Create</button>
                    </Link>
                </div>
                {!loading && <DataGrid
                    rows={contactData}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />}
            </div>
        </AdminWrapper>
    )
}
