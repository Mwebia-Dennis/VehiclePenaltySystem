
export const drawerWidth = 240;

export const pageType = {
    vehicle: {
        type: 'VEHICLE',
        sortByOptions: [
            "Plate Number",
            "creation date"
        ],
        searchOptions: ["Plate Number", "Owner Name"]
    },
    penalty: {
        type: 'PENALTY',
        sortByOptions: [
            "Plate Number", "receipt no", "owner name", "penalty date"
        ],
        searchOptions: ["Plate Number", "Owner Name", "Receipt No"],
    },
    users: {
        type: 'USERS',
        sortByOptions: [
            "Name",
            "creation date"
        ],
        searchOptions: ["Name"],
    },
}