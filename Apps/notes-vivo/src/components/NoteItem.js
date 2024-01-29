// import { Box, Checkbox, Typography } from "@mui/material";
// import moment from "moment";
// import React, { useState } from "react";

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

// const NoteItem = ({ id, title, date, description, checkOption }) => {
//   return (
//     <Box
//       className={
//         !checkOption
//           ? "singleNote d-flex align-items-center full"
//           : "singleNote d-flex align-items-center"
//       }
//     >
//       {checkOption && (
//         <Checkbox
//           {...label}
//           checked={selectedIds.includes(id)}
//           onChange={() => handleCheckboxChange(id)}
//         />
//       )}
//       <Box className="content">
//         <Typography variant="h6" gutterBottom>
//           {title}
//         </Typography>
//         <Typography variant="body2" gutterBottom className="oneline_eclipse">
//           {description}
//         </Typography>
//         <Typography variant="caption" display="block" gutterBottom>
//           {moment(date).format("MMMM Do")}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default NoteItem;
