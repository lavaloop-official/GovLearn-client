import Search, { SearchProps } from "antd/es/input/Search";
import {Button, Space, TreeSelect} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchWrapper} from "../api/helper";
import categoryBlue from "../assets/categoryBlue.png";
import { Category, Tag } from "../interfaces.ts";

function Searchbar() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [tagIDs, setTagIDs] = useState<number[]>([]);

    const navigate = useNavigate();

    const handleSearch = (searchString: string) => {
        navigate(`/searching/${searchString}`, { state: {tagIDs: tagIDs}, replace: true });
      };

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log(info?.source, value), handleSearch(value);
    };

    const [filterBtn, setFilterBtn] = useState(false)

    const onFilterBtn = () => {
        if (filterBtn == true)
            setFilterBtn(false)
        else
            setFilterBtn(true)
    }


    const { SHOW_PARENT } = TreeSelect;
    const [treeData, setTreeData] = useState<any[]>([]);

    const [value, setValue] = useState<string[]>([]);

    const onChange = (newValue: string[]) => {
      console.log('onChange ', newValue);
      setValue(newValue);
      const keyListTags:number[] = [];
      for (let index = 0; index < newValue.length; index++) {
        const key = Number(treeData.find(item => item.value === newValue[index])?.key);
        if(isNaN(key)){
            const tag = Number(tags.find(item => item.name === newValue[index])?.id);
            keyListTags.push(tag)
        }
        else{
            for (let index = 0; index < tags.length; index++) {
                const tagID = Number(tags[index].id);
                if (tags[index].categoryID == key && !keyListTags.includes(tagID))
                {
                    keyListTags.push(tagID);
                }
            }
        }
      }
      setTagIDs(keyListTags);
      console.log(tagIDs);
    };
  
    const tProps = {
      treeData,
      value,
      onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: 'Bitte wählen Sie einen Filter',
      style: {
        width: '100%',
      },
    };

    useEffect(() => {
        fetchWrapper.get('api/v1/tags').then(res => setTags(res.payload))
        fetchWrapper.get('api/v1/category').then(res => setCategories(res.payload))
        updateTreeDataWithCategories(categories, tags);
    }, [location.pathname])

    const updateTreeDataWithCategories = (categories: Category[], tags: Tag[]) => {
        const updatedTreeData = categories.map((category) => ({
          title: category.name,
          value: category.name,
          key: category.id,
          children: tags
            .filter((tag) => tag.categoryID === category.id)
            .map((tag) => ({
              title: tag.name,
              value: tag.name,
              key: tag.id,
          })),
        }));
        setTreeData(updatedTreeData);
      };

    return (
        <Space.Compact size="large" direction="vertical" style={{marginTop:"8px", marginBottom:"8px"}}>
        <Space.Compact size="large" style={{margin: "auto"}} >
            <Button onClick={onFilterBtn}><img src={categoryBlue} style={{width:"20px", marginLeft:"-5px", marginRight:"-5px", marginBottom:"-2px"}} /></Button>
            <Search placeholder="Kursangebote suchen" size="large" style={{maxWidth: "400px"}}allowClear onSearch={onSearch} autoComplete="off"/>
        </Space.Compact>
    {filterBtn ?
        <TreeSelect {...tProps} style={{position:"relative", zIndex:"1"}}/>
        : <div></div>
    }
    </Space.Compact>
    );
}

export default Searchbar;