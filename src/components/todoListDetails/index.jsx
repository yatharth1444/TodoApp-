import { DialogTitle, Dialog, DialogActions, Button } from "@mui/material";
import { Fragment } from "react";


function TodoListItemDetail({todoDetails, setOpenDialog, openDialog}){
    return (
        <Fragment>
            <Dialog onClose={()=>setOpenDialog(false)} open={openDialog}>
                <DialogTitle >{todoDetails?.todo}</DialogTitle>
                <DialogActions >
                    <Button 
                       onClick={()=>{
                        setOpenDialog(false)
                        
                       }}
                       
                    >Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
export default TodoListItemDetail