export const getUsersQuery: string = 
                                    `{
                                        getUsers {
                                            id
                                            username
                                            displayname
                                            settings {
                                                userId
                                                recieveNotifications
                                                recieveEmails
                                            }
                                        }
                                    }` 

export const createUserQuery: string = 
                            `mutation {
                                createUser(createUserData: { username: "Klara", displayname: "The Slayer" }) {
                                    id
                                    username
                                    displayname
                                }
                            }`