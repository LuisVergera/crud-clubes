const { id } = useParams();
const [data, getData] = useState([]);

const URL = `http://localhost:8080/club/${id}`;
const fetchApi = () => {
  fetch(URL)
    .then((res) => res.json())

    .then((response) => {
      console.log(response);
      getData(response);
    });
};

useEffect(() => {
  fetchApi();
}, []);
