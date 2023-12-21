import Search, {SearchProps} from "antd/es/input/Search";
import {Button, Popover, Space, Tag, Tree} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {Key, useEffect, useState} from "react";
import {fetchWrapper} from "../api/helper";
import categoryBlue from "../assets/categoryBlue.png";
import {Category, Coursetag} from "../interfaces.ts";
import './Searchbar.css';

function Searchbar() {

    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [treeData, setTreeData] = useState<object[]>([]);
    const [showTags, setShowTags] = useState<string[]>([]);

    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Coursetag[]>([]);

    const [tagsforselect, setTagsforselect] = useState<string[]>([]);

    const navigate = useNavigate();
    const location = useLocation();

    const onSearch: SearchProps['onSearch'] = (value) => {
        navigate('/searching', {state: {tagIDs: selectedTags, tagsforselect: tagsforselect, searchStr: value}});
    };

    const onSelect = (checked: { checked: Key[]; halfChecked: Key[]; } | Key[]) => {
        if (Array.isArray(checked)){
            const taglist = checked
                .filter((e) => e.toString().includes("-"))
                .map((e) => e.toString().split("-")[1])
                .map((e) => Number(e));
            setSelectedTags(taglist);
            setTagsforselect(checked.filter((e) => e.toString().includes("-")).map((e) => e.toString()))
        }
        updateShowTags(checked);
    }

    const updateShowTags = (checked: { checked: Key[]; halfChecked: Key[]; } | Key[]) => {
        if (Array.isArray(checked)){
            const taglist = checked
                .filter((e) => e.toString().includes("-"))
                .map((e) => e.toString())
            const catlist = checked
                .filter((e) => !e.toString().includes("-"))
                .map((e) => e.toString())
            const filteredTags = taglist.filter((e) => !catlist.includes(e.split("-")[0]))
            const tagNames = filteredTags.map((e) => tags.find((tag) => tag.id === Number(e.split("-")[1]) && tag.categoryID === Number(e.split("-")[0]))?.name)
            const catNames = catlist.map((e) => categories.find((cat) => cat.id === Number(e))?.name)
            setShowTags([...tagNames, ...catNames] as string[])
        }
    }

    const tProps = {
        treeData,
        onCheck: onSelect
    };

    const popContent = (
        <>
            <div style={{maxWidth: "250px"}}>
                {showTags.length != 0 ? showTags.map((tag) => (<Tag key={tag} >{tag}</Tag>)) : <Tag>Keine Filter ausgewählt</Tag>}
            </div>
            <Tree checkable {...tProps}/>
            <a onClick={() => onSearch("")}>Weitere Filter</a>
        </>

    )

    useEffect(() => {
        const tags = fetchWrapper.get('api/v1/tags').then(res => res.payload)
        const categories = fetchWrapper.get('api/v1/category').then(res => res.payload)
        Promise.all([tags, categories]).then(([tags, categories]) => {
            updateTreeDataWithCategories(categories, tags);
            setCategories(categories);
            setTags(tags);
        });
    }, [location.pathname])

    const updateTreeDataWithCategories = (categories: Category[], tags: Coursetag[]) => {
        const updatedTreeData = categories.map((category) => ({
            title: category.name,
            key: category.id,
            children: tags
                .filter((tag) => tag.categoryID === category.id)
                .map((tag) => (tag.id && category.id) ? {
                    title: tag.name,
                    key: category.id + "-" + tag.id,
                    id: tag.id,
                } : undefined),
        }));
        setTreeData(updatedTreeData);
    };

    return (
        <Space.Compact size="large" direction="vertical" style={{margin: "auto"}}>
            <Space.Compact size="large" style={{margin: "auto"}}>
                <Popover placement="bottomLeft" title={"Nach Kategorie Filtern"} arrow={false} trigger="click" content={popContent}>
                    <Button>
                        <img src={categoryBlue} style={{
                            width: "20px",
                            marginLeft: "-5px",
                            marginRight: "-5px",
                            marginBottom: "-2px"
                        }}/>
                    </Button>
                </Popover>
                <Search placeholder="Kursangebote suchen" size="large" style={{maxWidth: "400px"}} allowClear
                        onSearch={onSearch} autoComplete="off"/>
            </Space.Compact>
        </Space.Compact>
    );
}

export default Searchbar;