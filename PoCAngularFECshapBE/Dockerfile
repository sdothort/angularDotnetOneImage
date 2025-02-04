FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY . ./PoCAngularFECshapBE
WORKDIR /src/PoCAngularFECshapBE
RUN dotnet restore "PoCAngularFECshapBE.csproj"
RUN dotnet build "PoCAngularFECshapBE.csproj" -c $BUILD_CONFIGURATION -o /app/build


FROM node:18.19 AS node-build
WORKDIR /src
COPY . ./PoCAngularFECshapBE
WORKDIR /src/PoCAngularFECshapBE/ClientApp
RUN npm install
RUN npm run build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "PoCAngularFECshapBE.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false


FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=node-build /src/PoCAngularFECshapBE/ClientApp/dist/browser ./wwwroot
ENTRYPOINT ["dotnet", "PoCAngularFECshapBE.dll"]
