export default [
    {
        subheader: "Administration",
        permissions: [ "roles", "users" ],
        items: [
           {
                permission: "users",
                link: "/users",
                icon: "supervised_user_circle",
                title: "Users",
           }, 
           {
                permission: "roles",
                link: "/rbac",
                icon: "security",
                title: "RBAC",
           }, 
        ]
    },
    {
        subheader: "Articles",
        permissions: [ "descriptions" ],
        items: [
           {
                permission: "descriptions_list",
                link: "/articles",
                icon: "library_books",
                title: "Articles",
           }, 
           {
                permission: "descriptions_upload",
                link: "/upload",
                icon: "import_export",
                title: "Import",
           }, 
        ]
    },
]