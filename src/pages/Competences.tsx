import { Flex, Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import { fetchWrapper } from "../api/helper";
import { useEffect, useState } from "react";
import { Category, User, UserTag } from "../interfaces";
import TagPicker from "../components/Competences/TagPicker";

function Competences() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<UserTag[]>([]);
    const [userTags, setUserTags] = useState<UserTag[]>([]);
    const [selec, setSelec] = useState<number>(1);

    useEffect(() => {
        const tags = fetchWrapper.get('api/v1/tags').then(res => res.payload)
        const categories = fetchWrapper.get('api/v1/category').then(res => res.payload)
        const userTags = fetchWrapper.get('api/v1/tags/users').then(res => res.payload)
        setSelec(1);
        Promise.all([tags, categories, userTags]).then(([tags, categories, userTags]) => {
            setCategories(categories);
            setUserTags(userTags);
            setTags(tags);
            // if tag is in userTags, add rating to tag, if not rating is 0
            tags.forEach((tag: UserTag) => {
                const userTag = userTags.find((userTag: UserTag) => userTag.name === tag.name);
                if (userTag) {
                    tag.rating = userTag.rating;
                } else {
                    tag.rating = 0;
                }
            });
            
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
                    defaultSelectedKeys={[selec.toString()]}
                    items={items1.map(item => ({ ...item, onClick: () => setSelec(item?.key) }))}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <h4>Passe die dir zugeordneten Kompetenzen einfach an.</h4>
            <p>Hinweis: Durch die von dir abgeschlossen Weiterbildungen werden deine Kompetenzen kontinuierlich angepasst.</p>
            <Flex vertical wrap="wrap" gap={"10px"}>
                {
                    tags.map((tag) => {
                        if (tag.categoryID == selec) {
                            return (
                                <TagPicker tag={tag}/>
                            )
                        }
                    })
                }

            </Flex>
        </div>
    );

}

export default Competences;