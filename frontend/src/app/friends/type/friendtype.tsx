import { DocumentReference } from "firebase/firestore";

export interface Friend {
  userid: DocumentReference;
  status: string;            
}
