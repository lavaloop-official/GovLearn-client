import { Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import { fetchWrapper } from "../api/helper";
import { useEffect, useState } from "react";
import { Category, Coursetag } from "../interfaces";

function Competences() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Coursetag[]>([]);

    useEffect(() => {
        const tags = fetchWrapper.get('api/v1/tags').then(res => res.payload)
        const categories = fetchWrapper.get('api/v1/category').then(res => res.payload)
        Promise.all([tags, categories]).then(([tags, categories]) => {
            setCategories(categories);
            setTags(tags);
        });
    }, [])

    const items1: MenuProps['items'] = categories.map((category) => ({
        key: category.id?.toString() ?? '',
        label: `${category.name}`,
    }));
        

    return (
        <div style={{
            maxWidth: "1200px",
            margin: "auto",
            width: "100%",
            padding: "10px 10px"
        }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={items1}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
        </div>
    );

}

export default Competences;