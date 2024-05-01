const POST_HEADER = {

    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
}
export default POST_HEADER