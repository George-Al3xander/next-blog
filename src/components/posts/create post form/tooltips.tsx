

type MarkdownEl = {element: string, syntax: string}

const ContentTooltip = () => {
    const markdownElements: MarkdownEl[] = [
        { element: 'Heading 1', syntax: '# H1' },
        { element: 'Heading 2', syntax: '## H2' },
        { element: 'Heading 3', syntax: '### H3' },
        { element: 'Heading 4', syntax: '#### H4' },
        { element: 'Heading 5', syntax: '##### H5' },
        { element: 'Heading 6', syntax: '###### H6' },
        { element: 'Bold', syntax: '**bold text**' },
        { element: 'Italic', syntax: '*italicized text*' },
        { element: 'Blockquote', syntax: '> blockquote' },
        { element: 'Ordered List', syntax: '1. First item\n2. Second item\n3. Third item' },
        { element: 'Unordered List', syntax: '- First item\n- Second item\n- Third item' },
        { element: 'Code', syntax: '`code`' },
        { element: 'Horizontal Rule', syntax: '---' },
        { element: 'Link', syntax: '[title](https://www.example.com)' },
        { element: 'Image', syntax: '![alt text](image.jpg)' }
    ];
    
    


    return(<table>
        <thead className="font-bold border-b-2 border-primary">
            <th>Element</th>
            <th>Syntax</th>
        </thead>
        <tbody>
            {markdownElements.map((el) => {
                const list = el.syntax.split("\n")
                return <tr className="text-center border-b-2 border-primary" key={el.element}>
                    <td className="border-r-2 border-primary">{el.element}</td>
                    <td>{list.length == 1 ? 
                    el.syntax
                    :
                    <ul>
                        {list.map((listItem) => {
                            return <li>{listItem}</li>
                        })}
                    </ul>    
                    }</td>
                </tr>
            })}
        </tbody>
    </table>)
}


export default ContentTooltip