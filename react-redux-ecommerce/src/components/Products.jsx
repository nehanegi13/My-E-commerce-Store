import React, { useEffect, useState } from 'react'
import { getProdcuts } from '../services/api'
import { getCategories } from '../services/api'
import Grid from '@mui/material/Grid';
import ProductsItem from './ProductsItem';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectedCategory] = useState('electronics');
    const [loading, setLoading] = useState(false);
    const [sort, setSorting] = useState('sort');

    const getProductsData = () => {
        setLoading(true);
        getProdcuts()
        .then((res) => {
            setProducts(res.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    const getCategoriesData = () => {
        getCategories()
        .then((res) => {
            setCategory(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getProductsData();
        getCategoriesData();
    },[]);

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSortChange = (event) => {
        setSorting(event.target.value);
        sortFunction(products, event.target.value);
    };

    const sortFunction = (results, type) => {
        if (type === "ascending") {
            results.sort((a, b) => a.title > b.title ? 1 : -1,)  
        } else if (type === "descending") {
            results.sort((a, b) => a.title > b.title ? -1 : 1,)  
        }
        setProducts(results);
    };

  return (
    <>
        { loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        ) : (
            <>
                <div style={{display: 'flex', justifyContent: 'space-between', textAlign: 'left'}}>
                    <FormControl sx={{ m: 1, minWidth: {xs: 150, sm: 200}}}>
                        <InputLabel></InputLabel>
                        <Select
                        id="simple-select"
                        value={selectCategory}
                        label=""
                        onChange={handleChange}
                        >
                            {category?.map((val, index) => (
                                <MenuItem key={index} value={val}>{val}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: {xs: 150, sm: 200}}}>
                        <Select
                            value={sort}
                            onChange={handleSortChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value='sort'>Sorting</MenuItem>
                            <MenuItem value='ascending'>Ascending</MenuItem>
                            <MenuItem value='descending'>Descending</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <Grid container spacing={4} py={3}>
                    {products.filter(name => name.category === selectCategory).map((item) => (
                        <Grid item xs={12} sm={6} lg={3} key={item.id}>
                            <ProductsItem item={item} />
                        </Grid>
                    ))}
                </Grid>
            </>
        )}
    </>
  )
}
