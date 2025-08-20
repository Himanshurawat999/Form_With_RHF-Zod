import { createContext, useContext, useState, type ReactNode } from "react";

interface MyContextType {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    country: "",
    hobbies: [],
    contactMethod: "",
    photo: undefined,
    time: "",
    date: "",
    prof: "",
    company: "",
  });
  return (
    <MyContext.Provider value={{ formData, setFormData }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) throw new Error("ERROR");
  return context;
};
