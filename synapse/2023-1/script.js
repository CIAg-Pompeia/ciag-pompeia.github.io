fetch("https://api.github.com/repos/CIAg-Pompeia/ciag-pompeia.github.io/git/trees/main/synapse/2023-1")
    .then(e => e.json())
    .then(e => {
        console.log(e.tree.filter(t => t.type == 'tree'))
        const projects = (e.tree.filter(t => t.type == 'tree' && t.path !== 'assets')).map(m => {
            return ({ name: m.path, cover: `https://raw.githubusercontent.com/CIAg-Pompeia/ciag-pompeia.github.io/main/synapse/2023-1/${m.path}/cover.png` })
        });
        projects.forEach(project => {
            document.querySelector("#projects").appendChild(parseHTML(`<div onclick="window.location='${project.name}';">
                <img src="${project.cover}" onerror="this.src='assets/empty.svg'"/>
                <p>${project.name}</p>
            </div>`).body.firstChild)
        });
    })

const parseHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc;
}