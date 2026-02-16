import AuthGuard from "../AuthGruard";
import InformationForm from "../InformationForm";


const InformationEdit = () => {
	return (
		<AuthGuard>
			<InformationForm />
		</AuthGuard>
	);
};

export default InformationEdit;
