import { IconButton, Tooltip, Zoom } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Props {
  type: String;
  status?: boolean;
  color?: String;
  [key: string]: any;
}

function ActionButtons({ type, status, color, ...rest }: Props): JSX.Element {
  return (
    <>
      {type === "edit" && (
        <Tooltip TransitionComponent={Zoom} title={status ? "Action not allowed" : "Edit"}>
          <span>
            <IconButton
              aria-label="Edit"
              color="default"
              size="medium"
              disabled={status}
              {...rest}
            >
              <EditIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
      {type === "delete" && (
        <Tooltip TransitionComponent={Zoom} title={status ? "Action not allowed" : "Delete"}>
          <span>
            <IconButton
              aria-label="Delete"
              color="default"
              size="medium"
              disabled={status}
              {...rest}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
      {type === "view" && (
        <Tooltip TransitionComponent={Zoom} title={status ? "Action not allowed" : "view"}>
          <span>
            <IconButton
              aria-label="View"
              color="default"
              size="medium"
              disabled={status}
              {...rest}
            >
              <VisibilityIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </>
  );
}

export default ActionButtons;
