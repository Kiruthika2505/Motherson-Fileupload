import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Index() {

    const [fileview, setFileview] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3002/Viewfile/')
            .then(response => response.json())
            .then(json => setFileview(json));
    }, []);



    const handlesubmit = (event) => {
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = { headers: { "enctype": "multipart/form-data" } };

        axios.post('http://localhost:3002/Addfiles', datastring, config)
            .then(function (response) {
                if (response.data.status === 'error') {
                    alert('Error');
                    window.location.reload();
                }
                else if (response.data.status === 'uploaded') {
                    document.getElementById("files").innerHTML = "File uploaded!."
                    alert('File Uploaded');
                    // window.location.reload();
                }
                else {
                    alert('Contact Admin');
                    window.location.reload();
                }
            })
            .catch(function (error) {
                alert(error);
                window.location.reload();
            })
    }



    return (
        <>
            <div className="container">
                <form onSubmit={handlesubmit}>
                    <div className='col-lg-12 row mt-3'>
                        <div className='col-lg-4'>&nbsp;</div>
                        <div className='col-lg-4'>
                            <h4 className='text-center'>Single File Upload</h4>
                        </div>
                        <div className='col-lg-4'>&nbsp;</div>
                    </div>
                    <div className='col-lg-12 row mt-3'>
                        <div className='col-lg-4'>&nbsp;</div>
                        <div className='col-lg-4'>
                            <input type="file" name="filestore" id="filestore" className="form-control" />
                        </div>
                        <div className='col-lg-4'>&nbsp;</div>
                    </div>
                    <div className='col-lg-12 row mt-3 text-center'>
                        <div className='col-lg-4'>&nbsp;</div>
                        <div className='col-lg-4'>
                            <button type="submit" name="data_submit" id="data_submit" value="submit" className="btn btn-success">
                                <span>Upload</span>
                            </button>
                        </div>
                        <div className='col-lg-4'>&nbsp;</div>
                    </div>
                    <div className='col-lg-12 row mt-3 text-center'>
                        <div className='col-lg-4'>&nbsp;</div>
                        <div className='col-lg-4'>
                            <h3 id="files" className='text-center mt-2'></h3>
                        </div>
                        <div className='col-lg-4'>&nbsp;</div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-3">&nbsp;</div>
                        <div className="col-lg-6">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>File_id</th>
                                            <th>File_Name</th>
                                            <th>View</th>
                                            <th>Updated_date_time</th>
                                            <th>File_source</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            fileview.map((data, index) => (
                                                <tr>
                                                    <td>{data.file_id}</td>
                                                    <td>{data.file_name}</td>
                                                    <td><img src={data.file_object + data.file_name} className="img-fluid" /></td>
                                                    <td>{data.upload_date_time}</td>
                                                    <td>{data.file_source}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-3">&nbsp;</div>
                    </div>
                </form>
            </div>

        </>
    )
} 