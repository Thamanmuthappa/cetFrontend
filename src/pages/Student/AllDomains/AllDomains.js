import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ClubCarousel from "../../../components/Student/ClubCarousel/ClubCarousel";
import Loading from "../../../pages/Loading";
import { DataGrid } from "@material-ui/data-grid";
import {
	Paper,
	Button,
	Grid,
	Container,
	Typography,
	Divider,
	AppBar,
	Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import "../../../components/Shared/Navbar/Navbar.css";
import StudentNavbar from "../../../components/Student/StudentNavbar/StudentNavbar";
import { StudentContext } from "../../../context/StudentContext";
import { useHistory } from "react-router-dom";

const AllDomains = () => {
	const [clubs, setClubs] = useState();
	const [err, setErr] = useState();
	const history = useHistory();

	useEffect(() => {
		if (!isLoggedIn) {
			history.replace("/student/signin");
			return;
		}

		var config = {
			method: "get",
			url: `${process.env.REACT_APP_BACKEND_URL}/club/allFeatured`,
			headers: {},
		};

		axios(config)
			.then(function (response) {
				setClubs(response.data);
			})
			.catch(function (error) {
				setErr(error);
			});
	}, []);

	const { isLoggedIn } = useContext(StudentContext);

	const columns = [
		{ field: "id", headerName: "S. No.", flex: 1 },
		{ field: "name", headerName: "Organisation Name", flex: 1 },
		{ field: "category", headerName: "Category", flex: 1 },
		{ field: "subcategory", headerName: "Sub-Category", flex: 1 },
		// { field: 'website', headerName: 'Website', flex: 1, },
		{
			field: "website",
			headerName: "Website",
			description:
				"This column has either social or website links for the organisations.",
			sortable: true,
			flex: 1,
			renderCell: (params) => {
				return (
					<a href={params.getValue("website")} target="_blank">
						{params.getValue("website")}
					</a>
				);
			},
		},
	];

	const rows = [
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "VIT ANIMATION",
			website: "https://vitanimationclub.tech/",
			id: 1,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "VIT DANCE CLUB",
			website: "https://www.instagram.com/vitdanceclub/?hl=en",
			id: 2,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "DEBSOC – VIT",
			website: "https://www.facebook.com/vitdebsoc/",
			id: 3,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "DRAMATICS CLUB",
			website: "https://www.instagram.com/vitdramatics/?hl=en",
			id: 4,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "FILM SOCIETY",
			website:
				"https://www.instagram.com/vitfilmsociety/?igshid=mfnkk4a3fath&hl=en",
			id: 5,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "FINE ARTS CLUB",
			website: "https://www.instagram.com/thefineartsclubvit/?hl=en",
			id: 6,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "MUSIC CLUB",
			website: "https://www.instagram.com/vitmusicclub/?hl=en",
			id: 7,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "PHOTOGRAPHY",
			website: "https://www.instagram.com/photographyclubvit/?hl=en",
			id: 8,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "ANCHORING GROUP",
			website: "https://www.facebook.com/anchoring2020/",
			id: 9,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "THE COMEDY CLUB",
			website: "https://www.instagram.com/comedyclubvit/?hl=en",
			id: 10,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "PIXELATE",
			website: "https://www.instagram.com/pixelatevit/?hl=en",
			id: 11,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "QUIZ CLUB",
			website: "https://www.instagram.com/quizclubvit/",
			id: 12,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "COMMUNITY RADIO",
			website: "https://www.instagram.com/vitradio/?hl=en",
			id: 13,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "CREATIVITY CLUB",
			website: "https://www.instagram.com/creativityclub_vit/?hl=en",
			id: 14,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "HERITAGE CLUB",
			website:
				"https://www.instagram.com/heritageclubvit/?igshid=s1xr42lbh2kc&hl=en",
			id: 15,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "NATURE LOVER’S CLUB",
			website: "https://www.picuki.com/profile/natureclubvit",
			id: 16,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "SPIC MACAY",
			website:
				"https://www.facebook.com/pages/category/Performance-Art/Spic-Macay-Vit-Chapter-668403383317525/",
			id: 17,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "TEDXVIT",
			website: "https://www.facebook.com/Tedxvitvellore/",
			id: 18,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "VIT - MUNSOC",
			website: "https://munsocietyvit.wordpress.com/vitmun/",
			id: 19,
		},
		{
			category: "ARTS&CULTURAL",
			subcategory: "-",
			name: "VIT SPARTANS",
			website: "https://www.instagram.com/vitspartans/?hl=en",
			id: 20,
		},
		{
			category: "TECHNICAL",
			subcategory: "Biology",
			name: "ALPHA BIO CELL",
			website: "https://www.instagram.com/alphabiocell/?hl=en",
			id: 21,
		},
		{
			category: "TECHNICAL",
			subcategory: "Coding and Development",
			name: "Apple Developers Group",
			website: "https://adgvit.com/",
			id: 22,
		},
		{
			category: "TECHNICAL",
			subcategory: "-",
			name: "ARCHI-TECH",
			website: "",
			id: 23,
		},
		{
			category: "TECHNICAL",
			subcategory: "Business",
			name: "BULLS AND BEARS",
			website: "https://www.instagram.com/bullsandbears_vit/?hl=en",
			id: 24,
		},
		{
			category: "TECHNICAL",
			subcategory: "Coding and Development",
			name: "LINUX USER'S GROUP",
			website: "https://www.instagram.com/vit_lug/?hl=en",
			id: 25,
		},
		{
			category: "TECHNICAL",
			subcategory: "Physics",
			name: "GURUTVA - THE PHYSICS CLUB",
			website: "https://www.instagram.com/gurutva_vit/",
			id: 26,
		},
		{
			category: "TECHNICAL",
			subcategory: "Coding and Development",
			name: "(GDG)Developer Student Club",
			website: "https://dscvit.com/",
			id: 27,
		},
		{
			category: "TECHNICAL",
			subcategory: "Coding and Development",
			name: "CODECHEF",
			website: "https://www.codechefvit.com/",
			id: 28,
		},
		{
			category: "TECHNICAL",
			subcategory: "Managment",
			name: "(CSED)Centre for Social Entrepreneurship Development",
			website: "https://www.csedvit.com/",
			id: 29,
		},
		{
			category: "TECHNICAL",
			subcategory: "Mechanical",
			name: "CREATION LAB",
			website: "https://www.facebook.com/clabsvit/",
			id: 30,
		},
		{
			category: "TECHNICAL",
			subcategory: "Business",
			name: "DREAM MERCHANTS",
			website: "https://www.instagram.com/dreammerchantsvit/?hl=en",
			id: 31,
		},
		{
			category: "TECHNICAL",
			subcategory: "-",
			name: "Energy & Environment Protection Club (E2PC)",
			website: "https://www.facebook.com/e2pcvit/",
			id: 32,
		},
		{
			category: "TECHNICAL",
			subcategory: "Business",
			name: "Entrepreneurs Cell (E-cell)",
			website: "https://ecellvit.com/",
			id: 33,
		},
		{
			category: "TECHNICAL",
			subcategory: "-",
			name: "INNOVATOR'S QUEST",
			website: "http://iquestvit.com/",
			id: 34,
		},
		{
			category: "TECHNICAL",
			subcategory: "Coding and Development",
			name: "Internet of Things Club (IoThinc)",
			website: "https://in.linkedin.com/company/iothincvit",
			id: 35,
		},
		{
			category: "TECHNICAL",
			subcategory: "Coding and Development",
			name: "MOZILLA FIREFOX",
			website: "https://mfcvit.in/",
			id: 36,
		},
		{
			category: "TECHNICAL",
			subcategory: "Mechanical",
			name: "RoboVITics",
			website: "https://robovitics.in/",
			id: 37,
		},
		{
			category: "TECHNICAL",
			subcategory: "-",
			name: "SOLAI CLUB",
			website: "https://www.instagram.com/solaiclubvit/",
			id: 38,
		},
		{
			category: "TECHNICAL",
			subcategory: "-",
			name: "SABEST",
			website: "https://www.facebook.com/vitsabest/",
			id: 39,
		},
		{
			category: "TECHNICAL",
			subcategory: "-",
			name: "Technology and Gaming Club (TAG)",
			website: "https://tagclub.in/",
			id: 40,
		},
		{
			category: "TECHNICAL",
			subcategory: "-",
			name: "THE CATALYST CLUB",
			website: "https://www.instagram.com/thecatalystclubvit/?hl=en",
			id: 41,
		},
		{
			category: "TECHNICAL",
			subcategory: "-",
			name: "The Electronics Club (TEC)",
			website: "https://www.instagram.com/tec.vit/?hl=en",
			id: 42,
		},
		{
			category: "TECHNICAL",
			subcategory: "-",
			name: "VENTURESITY",
			website: "https://www.facebook.com/venturesity.vit/",
			id: 43,
		},
		{
			category: "TECHNICAL",
			subcategory: "-",
			name: "VISUAL BLOGGER'S",
			website: "http://www.vbcvit.com/",
			id: 44,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "ZERO WASTE MANAGEMENT CLUB",
			website: "",
			id: 45,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "ANOKHA",
			website: "https://anokhangovit.wordpress.com/",
			id: 46,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "AYUDA",
			website: "https://www.facebook.com/ngoayuda/",
			id: 47,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "Becoming I Foundation",
			website: "https://www.instagram.com/bif_vit/?hl=en",
			id: 48,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "FEPSI",
			website: "https://www.instagram.com/fepsi.india/?hl=en",
			id: 49,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "VIT FIFTH PILLAR",
			website: "https://5pvit.wordpress.com/about/",
			id: 50,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "Good Girls And Boys (GGB)",
			website: "",
			id: 51,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "Juvenile Care VIT",
			website: "https://www.instagram.com/juvenilecarevit/?hl=en",
			id: 52,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "KALVI",
			website: "",
			id: 53,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "LEO CLUB",
			website: "https://www.instagram.com/vit_leo_club/?hl=en",
			id: 54,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "Make A Difference (MAD)",
			website: "https://www.instagram.com/makeadiffindia/?hl=en",
			id: 55,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "National Cadet Corps (NCC)",
			website: "https://www.facebook.com/vitncc/",
			id: 56,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "National Service Scheme (NSS)",
			website: "",
			id: 57,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "ROTARACT CLUB",
			website:
				"https://www.instagram.com/rotaract_club_of_vit/p/BnRXrSPFtc_/?hl=en",
			id: 58,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "Red Ribbon clubs (RRC)",
			website: "",
			id: 59,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "UDDESHYA",
			website: "https://www.facebook.com/VIT.Uddeshya/",
			id: 60,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "Universal Higher Education Trust (UHET) Club - HEARTS",
			website: "https://m.facebook.com/heartsvit/",
			id: 61,
		},
		{
			category: "SOCIAL OUTREACH",
			subcategory: "-",
			name: "Youth Red Cross – VIT",
			website: "https://www.instagram.com/yrc_vit/?hl=en",
			id: 62,
		},
		{
			category: "HEALTH & WELLNESS",
			subcategory: "-",
			name: "SPORTS CLUB",
			website: "",
			id: 63,
		},
		{
			category: "HEALTH & WELLNESS",
			subcategory: "-",
			name: "SMILE OVER STRESS(SOS)-PSYCHOLOGY CLUB",
			website:
				"https://in.linkedin.com/company/smile-over-stress-sos-vit",
			id: 64,
		},
		{
			category: "HEALTH & WELLNESS",
			subcategory: "-",
			name: "SKATING CLUB",
			website: "",
			id: 65,
		},
		{
			category: "HEALTH & WELLNESS",
			subcategory: "-",
			name: "BEAT BOXING CLUB",
			website: "",
			id: 66,
		},
		{
			category: "HEALTH & WELLNESS",
			subcategory: "-",
			name: "NUTRITION CLUB",
			website: "https://www.instagram.com/nutrition_club.vit/?hl=en",
			id: 67,
		},
		{
			category: "HEALTH & WELLNESS",
			subcategory: "-",
			name: "CUBING CLUB",
			website: "https://www.facebook.com/c.u.b.e.VITclub/",
			id: 68,
		},
		{
			category: "HEALTH & WELLNESS",
			subcategory: "-",
			name: "BOARD GAMERS CLUB",
			website: "https://www.instagram.com/boardgamersclubvit/?hl=en",
			id: 69,
		},
		{
			category: "HEALTH & WELLNESS",
			subcategory: "-",
			name: "CYCLING CLUB",
			website: "https://www.instagram.com/vit_cycling_club/",
			id: 70,
		},
		{
			category: "HEALTH & WELLNESS",
			subcategory: "-",
			name: "CULINARY CLUB",
			website: "https://www.facebook.com/culinaryclubvit/",
			id: 71,
		},
		{
			category: "HEALTH & WELLNESS",
			subcategory: "-",
			name: "FITNESS N BEYOND",
			website: "https://www.facebook.com/fnb.fitnessnbeyond/",
			id: 72,
		},
		{
			category: "HEALTH & WELLNESS",
			subcategory: "-",
			name: "HEALTH CLUB",
			website: "https://www.instagram.com/health_club_vit/?hl=en",
			id: 73,
		},
		{
			category: "HEALTH & WELLNESS",
			subcategory: "-",
			name: "TREKKING CLUB",
			website: "https://www.instagram.com/vittrekkingclub/?hl=en",
			id: 74,
		},
		{
			category: "HEALTH & WELLNESS",
			subcategory: "-",
			name: "YOGA CLUB",
			website: "https://www.facebook.com/yogaclubvit/",
			id: 75,
		},
		{
			category: "LITERATURE",
			subcategory: "-",
			name: "GUJARATI LITERARY ASSOCIATION",
			website: "https://www.facebook.com/gla.vitu/",
			id: 76,
		},
		{
			category: "LITERATURE",
			subcategory: "-",
			name: "GERMANY LITERARY ASSOCIATION",
			website: "",
			id: 77,
		},
		{
			category: "LITERATURE",
			subcategory: "-",
			name: "FRENCH LITERARY ASSOCIATION",
			website: "",
			id: 78,
		},
		{
			category: "LITERATURE",
			subcategory: "-",
			name: "Book Club (The Next Chapter)",
			website: "https://www.instagram.com/thenextchapter.vit/",
			id: 79,
		},
		{
			category: "LITERATURE",
			subcategory: "-",
			name: "Bengali Literary Association (Aikyataan)",
			website: "https://www.facebook.com/aikyataan.vitu/",
			id: 80,
		},
		{
			category: "LITERATURE",
			subcategory: "-",
			name: "ENGLISH LITERARY ASSOCIATION (ELA)",
			website: "https://www.facebook.com/vitenglishliteraryassociation/",
			id: 81,
		},
		{
			category: "LITERATURE",
			subcategory: "-",
			name: "Hindi Literary Association (HLA)",
			website: "https://www.facebook.com/hla.vitu/",
			id: 82,
		},
		{
			category: "LITERATURE",
			subcategory: "-",
			name: "Kannada Literary Association (Kannada Kasthuri - KLA)",
			website: "https://www.instagram.com/kla.vit/",
			id: 83,
		},
		{
			category: "LITERATURE",
			subcategory: "-",
			name: "Malayalam Literary Association (Thanima-MLA)",
			website: "https://www.facebook.com/mlathanima/",
			id: 84,
		},
		{
			category: "LITERATURE",
			subcategory: "-",
			name: "Marathi Literature Association (Yuva Marathi)",
			website: "https://in.linkedin.com/company/yuva-marathi",
			id: 85,
		},
		{
			category: "LITERATURE",
			subcategory: "-",
			name: "Tamil Literary Association (TLA)",
			website: "https://www.instagram.com/vitu.tla/?hl=en",
			id: 86,
		},
		{
			category: "LITERATURE",
			subcategory: "-",
			name: "National Digital Library (NDL)",
			website: "",
			id: 87,
		},
		{
			category: "LITERATURE",
			subcategory: "-",
			name: "Telugu Literary Association (Sahiti)",
			website:
				"https://www.instagram.com/sahiti_tla/?igshid=17lrir8v58h0j",
			id: 88,
		},
		{
			category: "LITERATURE",
			subcategory: "-",
			name: "Deccan Chronicle Club",
			website: "https://www.facebook.com/decchronicle/",
			id: 89,
		},
		{
			category: "LITERATURE",
			subcategory: "-",
			name: "The Hindu Education Plus Club (THEP)",
			website: "https://www.thepcvit.com/",
			id: 90,
		},
		{
			category: "TECHNICAL",
			subcategory: "-",
			name: "SIAM VIT",
			website: "https://www.siamvit.in",
			id: 90,
		},
	];

	const clubsMap = (arr) => {
		if (arr.length !== 0) {
			let x = arr.map((club, i) => <ClubCarousel key={i} club={club} />);
			return x;
		} else {
			return "No public organisation in this domain available right now 😞";
		}
	};

	if (err) {
		alert("Something went wrong. Please try again.");
	} else if (clubs) {
		let techClubs = [];
		let artsClubs = [];
		let socialClubs = [];
		let healthClubs = [];
		let litClubs = [];
		let otherClubs = [];
		for (let x in clubs.clubs) {
			if (clubs.clubs[x].type.toLowerCase() === "technical") {
				techClubs.push(clubs.clubs[x]);
			}
			if (clubs.clubs[x].type.toLowerCase() === "arts and culture") {
				artsClubs.push(clubs.clubs[x]);
			}
			if (clubs.clubs[x].type.toLowerCase() === "social outreach") {
				socialClubs.push(clubs.clubs[x]);
			}
			if (clubs.clubs[x].type.toLowerCase() === "health and wellness") {
				healthClubs.push(clubs.clubs[x]);
			}
			if (clubs.clubs[x].type.toLowerCase() === "literature") {
				litClubs.push(clubs.clubs[x]);
			}
			if (clubs.clubs[x].type.toLowerCase() === "other") {
				otherClubs.push(clubs.clubs[x]);
			}
		}
		return (
			<>
				<div className="cont-color" style={{background: "#081220"}}>
				<StudentNavbar location="Dashboard" />
				<Container style={{ marginBottom: "40px" , background: "#081220"}}>
					<div style={{ display: "flex", marginTop: "40px" }}>
						<Typography
							gutterBottom
							variant="h3"
							style={{
								fontFamily: "Source Sans Pro",
								fontWeight: "600",
								color: "#fff",
							}}
						>
							Featured Organisations
						</Typography>
					</div>
					<Divider style={{background: "#f5f5f540"}}/>
					<Grid container style={{ marginTop: "40px" }}>
						<Typography
							gutterBottom
							variant="h4"
							style={{
								fontFamily: "Source Sans Pro",
								fontWeight: "600",
								color: "#fff",
							}}
						>
							Technical
						</Typography>
					</Grid>
					<Grid
						container
						style={{ marginTop: "25px", marginBottom: "25px" }}
					>
						{clubsMap(techClubs)}
					</Grid>
					<Grid container style={{ marginTop: "40px" }}>
						<Typography
							gutterBottom
							variant="h4"
							style={{
								fontFamily: "Source Sans Pro",
								fontWeight: "600",
								color: "#fff",
							}}
						>
							Arts and Culture
						</Typography>
						<Grid
							container
							style={{ marginTop: "25px", marginBottom: "25px" }}
						>
							{clubsMap(artsClubs)}
						</Grid>
					</Grid>
					<Grid container style={{ marginTop: "40px" }}>
						<Typography
							gutterBottom
							variant="h4"
							style={{
								fontFamily: "Source Sans Pro",
								fontWeight: "600",
								color: "#fff",
							}}
						>
							Health and Wellness
						</Typography>
					</Grid>
					<Grid
						container
						style={{ marginTop: "25px", marginBottom: "25px" }}
					>
						{clubsMap(healthClubs)}
					</Grid>
					<Grid container style={{ marginTop: "40px" }}>
						<Typography
							gutterBottom
							variant="h4"
							style={{
								fontFamily: "Source Sans Pro",
								fontWeight: "600",
								color: "#fff",
							}}
						>
							Literature
						</Typography>
					</Grid>
					<Grid
						container
						style={{ marginTop: "25px", marginBottom: "25px" }}
					>
						{clubsMap(litClubs)}
					</Grid>
					<Grid container style={{ marginTop: "40px" }}>
						<Typography
							gutterBottom
							variant="h4"
							style={{
								fontFamily: "Source Sans Pro",
								fontWeight: "600",
								color: "#fff",
							}}
						>
							Social Outreach
						</Typography>
					</Grid>
					<Grid
						container
						style={{ marginTop: "25px", marginBottom: "25px" }}
					>
						{clubsMap(socialClubs)}
					</Grid>
					<Grid container style={{ marginTop: "40px" }}>
						<Typography
							gutterBottom
							variant="h4"
							style={{
								fontFamily: "Source Sans Pro",
								fontWeight: "600",
								color: "#fff",
							}}
						>
							Other Domains
						</Typography>
					</Grid>
					<Grid
						container
						style={{ marginTop: "25px", marginBottom: "40px" }}
					>
						{clubsMap(otherClubs)}
					</Grid>
					<div style={{ display: "flex", marginTop: "80px" }}>
						<Typography
							gutterBottom
							variant="h3"
							style={{
								fontFamily: "Source Sans Pro",
								fontWeight: "600",
								color: "#fff",
							}}
						>
							All Organisations
						</Typography>
					</div>
					<Divider style={{background:"#F5F5F540"}}/>
					<div
						style={{
							height: 700,
							width: "100%",
							marginTop: "40px",
							marginBottom: "40px",
							background: "#081220",
						}}
					>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={20}
							checkboxSelection={false}
							disableSelectionOnClick={true}
						/>
					</div>
				</Container>
				</div>
				<Grid
					container
					style={{
						backgroundColor: "#FCF9F9",
						color: "#2C2D2D",
						padding: "25px",
					}}
				>
					<Grid
						item
						xs={4}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<div>
							<center>
								<a
									href="https://www.codechefvit.com"
									target="_blank"
									rel="noreferrer"
								>
									<img
										src="/assets/blacklogo.png"
										alt="CodeChef-VIT"
										width="150px"
										align="center"
									/>
								</a>
							</center>

							<p style={{ textAlign: "center" }}>
								Imagined, Designed and Developed by{" "}
								<a
									href="https://www.codechefvit.com"
									style={{ color: "#1799E1" }}
									target="_blank"
									rel="noreferrer"
								>
									CodeChef-VIT
								</a>
							</p>
						</div>
					</Grid>
					{/* <Grid item xs={4}></Grid>
					<Grid
						item
						xs={4}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<center>
							<a
								href="https://vitspot.com"
								target="_blank"
								rel="noreferrer"
							>
								<img
									src="/assets/vitspot.png"
									alt="vitspot"
									width="85px"
									align="center"
								/>
							</a>
						</center>

						<p style={{ textAlign: "center" }}>
							Powered by{" "}
							<a
								href="https://vitspot.com"
								style={{ color: "#1799E1" }}
								target="_blank"
								rel="noreferrer"
							>
								VITspot
							</a>
						</p>
					</Grid> */}
				</Grid>
			</>
		);
	} else {
		return <Loading />;
	}
};

export default AllDomains;
